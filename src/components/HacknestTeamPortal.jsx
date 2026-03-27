import React, { useEffect, useMemo, useState } from 'react';

const API_BASE_RAW = import.meta.env.VITE_HACKNEST_API;
const API_BASE = API_BASE_RAW ? API_BASE_RAW.replace(/\/$/, '') : '';
const INTEGRATION_SECRET = (import.meta.env.VITE_HACKNEST_INTEGRATION_SECRET || '').trim();
const FRONTEND_BASE_RAW = import.meta.env.VITE_HACKNEST_FRONTEND_URL;
const FRONTEND_BASE = FRONTEND_BASE_RAW ? FRONTEND_BASE_RAW.replace(/\/$/, '') : '';
const HACKNEST_LOGO_URL = FRONTEND_BASE ? `${FRONTEND_BASE}/hacknest-logo.png` : '';

function isIntegrationSecretMismatch(response, data) {
  return response?.status === 403 && String(data?.detail || '').toLowerCase().includes('integration secret');
}

function redirectToHacknestOriginalPortal(token) {
  if (!FRONTEND_BASE || !token) {
    return false;
  }
  let url = `${FRONTEND_BASE}/team-portal/${encodeURIComponent(token)}`;
  url += '?force_native=1';
  window.location.assign(url);
  return true;
}

function getOriginalPortalUrl(token) {
  if (!FRONTEND_BASE || !token) {
    return '';
  }
  return `${FRONTEND_BASE}/team-portal/${encodeURIComponent(token)}`;
}

function handleMissingIntegrationSecret(token, source) {
  console.error(`[HacknestTeamPortal:${source}] missing integration secret in environment`);
  return redirectToHacknestOriginalPortal(token);
}

function handleIntegrationSecretMismatch(response, data, token, source) {
  if (!isIntegrationSecretMismatch(response, data)) {
    return false;
  }

  // Keep participant UX clean; keep technical details in console for debugging.
  console.error(`[HacknestTeamPortal:${source}] integration secret mismatch`, {
    status: response?.status,
    detail: data?.detail,
  });

  return redirectToHacknestOriginalPortal(token);
}

function getApiErrorMessage(response, data, fallbackMessage) {
  return data?.detail || fallbackMessage;
}

function getApiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
}

function getIntegrationHeaders(extraHeaders = {}) {
  const headers = { ...extraHeaders };
  if (INTEGRATION_SECRET) {
    headers['x-hn-integration-secret'] = INTEGRATION_SECRET;
  }
  return headers;
}

function getStatusMeta(portalData) {
  const status = portalData.team.status;

  if (status === 'rejected') {
    return {
      tone: 'danger',
      badge: 'Not Selected',
      title: 'Application Not Selected',
      subtitle: 'Thank you for participating. Keep building and keep shipping.',
    };
  }

  if (status === 'shortlisted') {
    return {
      tone: 'success',
      badge: 'Shortlisted',
      title: 'Team Accepted',
      subtitle: 'Complete RSVP to secure your participation.',
    };
  }

  if (status === 'waitlisted') {
    return {
      tone: 'warning',
      badge: 'Waitlisted',
      title: 'Team Waitlisted',
      subtitle: 'You will be notified if a spot opens up.',
    };
  }

  if (!portalData.hackathon.idea_submission_required) {
    return {
      tone: 'info',
      badge: 'Onboarding',
      title: 'Team Onboarding Successful',
      subtitle: 'Awaiting review from organizers.',
    };
  }

  if (portalData.team.has_submission) {
    return {
      tone: 'info',
      badge: 'Submitted',
      title: 'Submission Received',
      subtitle: 'Your idea has been received and is under review.',
    };
  }

  if (portalData.hackathon.is_submission_open) {
    return {
      tone: 'info',
      badge: 'Open',
      title: 'Submission Window Open',
      subtitle: 'Upload your idea before the submission window closes.',
    };
  }

  return {
    tone: 'muted',
    badge: 'Closed',
    title: 'Submission Window Closed',
    subtitle: 'Contact organizers if you need support.',
  };
}

export default function HacknestTeamPortal() {
  const [portalData, setPortalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpSelections, setRsvpSelections] = useState({});

  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const token = searchParams.get('hn_token') || '';
  const isTestMode = searchParams.get('hn_test_mode') === '1';
  const originalPortalUrl = getOriginalPortalUrl(token);

  const openOriginalPortal = () => {
    if (originalPortalUrl) {
      let url = originalPortalUrl;
      if (url.includes('?')) {
        url += '&force_native=1';
      } else {
        url += '?force_native=1';
      }
      window.location.assign(url);
    }
  };

  const hasAnyRsvpConfirmed =
    (portalData?.team?.leader?.rsvp || false) ||
    (portalData?.team?.members || []).some((member) => member.rsvp);

  const fetchPortalData = async () => {
    if (!API_BASE) {
      setError('Missing VITE_HACKNEST_API in environment. Configure it in your .env file.');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Missing hn_token. Open this page from a valid HackNest team portal link.');
      setLoading(false);
      return;
    }

    if (!INTEGRATION_SECRET) {
      if (!handleMissingIntegrationSecret(token, 'team-portal-data')) {
        setError('Unable to continue in custom portal configuration.');
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(`/hackathon/team-portal-data/${token}`), {
        headers: getIntegrationHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        if (handleIntegrationSecretMismatch(response, data, token, 'team-portal-data')) {
          return;
        }
        throw new Error(getApiErrorMessage(response, data, 'Failed to load team portal data'));
      }

      const cacheBuster = Date.now();
      setPortalData({
        hackathon: {
          name: data.hackathon?.name || 'Hackathon',
          accent_color: data.hackathon?.accent_color || '#5c4033',
          hackathon_logo_url: data.hackathon?.hackathon_logo
            ? `${getApiUrl(data.hackathon.hackathon_logo)}?t=${cacheBuster}`
            : null,
          institute_logo_url: data.hackathon?.institute_logo
            ? `${getApiUrl(data.hackathon.institute_logo)}?t=${cacheBuster}`
            : null,
          is_submission_open: data.hackathon?.is_submission_open ?? false,
          idea_submission_required: data.hackathon?.idea_submission_required ?? true,
          is_rsvp_open: data.hackathon?.is_rsvp_open ?? false,
          min_team_size: data.hackathon?.min_team_size ?? 1,
          max_team_size: data.hackathon?.max_team_size ?? 5,
          template_url: data.hackathon?.template_path ? getApiUrl(data.hackathon.template_path) : null,
        },
        team: {
          name: data.team?.team_name || 'Team',
          status: data.team?.status || '',
          leader: {
            id: data.team?.leader?.id || 'leader',
            name: data.team?.leader?.name || 'Leader',
            email: data.team?.leader?.email || 'Not available',
            rsvp: data.team?.leader?.rsvp ?? false,
          },
          members: (data.team?.members || []).map((member) => ({
            id: member.id || member.email || Math.random().toString(36).slice(2),
            name: member.name || 'Member',
            email: member.email || 'Not available',
            rsvp: member.rsvp ?? false,
          })),
          has_submission: data.team?.has_submission ?? false,
          submission_url: data.team?.submission_path || null,
        },
      });
      setUploadSuccess(false);
      setRsvpSelections({});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load team portal data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      alert('Please upload a PDF file (.pdf).');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be below 10MB.');
      event.target.value = '';
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(getApiUrl(`/hackathon/submit-idea/${token}`), {
        method: 'POST',
        body: formData,
        headers: getIntegrationHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        if (handleIntegrationSecretMismatch(response, data, token, 'submit-idea')) {
          return;
        }
        throw new Error(getApiErrorMessage(response, data, 'Failed to upload submission'));
      }

      setUploadSuccess(true);
      alert(data.message || 'Submission uploaded successfully.');
      await fetchPortalData();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const deleteSubmission = async () => {
    if (!portalData?.team?.has_submission) {
      return;
    }

    if (!window.confirm('Delete current submission? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(getApiUrl(`/hackathon/delete-submission/${token}`), {
        method: 'DELETE',
        headers: getIntegrationHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        if (handleIntegrationSecretMismatch(response, data, token, 'delete-submission')) {
          return;
        }
        throw new Error(getApiErrorMessage(response, data, 'Failed to delete submission'));
      }

      alert('Submission deleted successfully.');
      await fetchPortalData();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const downloadSubmission = () => {
    fetch(getApiUrl(`/hackathon/download-submission/${token}`), {
      headers: getIntegrationHeaders(),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          if (handleIntegrationSecretMismatch(response, data, token, 'download-submission')) {
            return null;
          }
          throw new Error(getApiErrorMessage(response, data, 'Failed to download submission'));
        }
        return response.blob();
      })
      .then((blob) => {
        if (!blob) {
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'submission.pdf';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        alert(error instanceof Error ? error.message : 'Failed to download submission');
      });
  };

  const downloadTemplate = () => {
    if (!portalData?.hackathon?.template_url) {
      return;
    }
    window.open(portalData.hackathon.template_url, '_blank');
  };

  const handleRsvpSubmit = async () => {
    if (!portalData) {
      return;
    }

    const attendingCount = Object.values(rsvpSelections).filter(Boolean).length;
    const minSize = portalData.hackathon.min_team_size;
    const maxSize = portalData.hackathon.max_team_size;

    if (attendingCount < minSize) {
      alert(`At least ${minSize} team member(s) must confirm attendance.`);
      return;
    }

    if (attendingCount > maxSize) {
      alert(`Maximum ${maxSize} team member(s) can attend.`);
      return;
    }

    if (attendingCount === 0) {
      alert('Please select at least one team member to attend.');
      return;
    }

    if (!window.confirm(`Confirm RSVP for ${attendingCount} participant(s)? This cannot be undone from this portal.`)) {
      return;
    }

    setSubmittingRsvp(true);
    try {
      const response = await fetch(getApiUrl(`/hackathon/team-rsvp/${token}`), {
        method: 'PUT',
        headers: {
          ...getIntegrationHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rsvp: rsvpSelections }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (handleIntegrationSecretMismatch(response, data, token, 'team-rsvp')) {
          return;
        }
        throw new Error(getApiErrorMessage(response, data, 'Failed to submit RSVP'));
      }

      alert('RSVP confirmed successfully.');
      await fetchPortalData();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'RSVP submission failed.');
    } finally {
      setSubmittingRsvp(false);
    }
  };

  if (loading) {
    return (
      <section className="section-wrapper team-portal-shell">
        <div className="portal-card">
          <h1 className="section-heading">Loading Team Portal...</h1>
          {originalPortalUrl && (
            <div style={{ marginTop: '14px' }}>
              <p className="portal-fallback-note">
                If this page is not working properly, please continue from the native HackNest Team Portal.
              </p>
              <div className="portal-actions" style={{ marginTop: '8px' }}>
                <button className="portal-doc-link portal-native-btn" onClick={openOriginalPortal}>
                  <img src={HACKNEST_LOGO_URL} alt="HackNest" className="portal-native-logo-img" />
                  <span>Open HackNest Team Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-wrapper team-portal-shell">
        <div className="portal-card">
          <h1 className="section-heading">Team Portal Error</h1>
          <p className="portal-error">{error}</p>
          {originalPortalUrl && (
            <div style={{ marginTop: '14px' }}>
              <p className="portal-fallback-note">
                If this page is not working properly, please continue from the native HackNest Team Portal.
              </p>
              <div className="portal-actions" style={{ marginTop: '8px' }}>
                <button className="portal-doc-link portal-native-btn" onClick={openOriginalPortal}>
                  <img src={HACKNEST_LOGO_URL} alt="HackNest" className="portal-native-logo-img" />
                  <span>Open HackNest Team Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (!portalData) {
    return null;
  }

  const accent = portalData.hackathon.accent_color || '#5c4033';
  const statusMeta = getStatusMeta(portalData);
  const isRejected = portalData.team.status === 'rejected';
  const isWaitlisted = portalData.team.status === 'waitlisted';
  const isShortlisted = portalData.team.status === 'shortlisted';
  const showSubmissionSection = !isRejected && !isWaitlisted && !isShortlisted && portalData.hackathon.idea_submission_required;
  const selectedCount = Object.values(rsvpSelections).filter(Boolean).length;

  return (
    <section className="section-wrapper team-portal-shell">
      <div className="portal-card">
        <header className="portal-header">
          <div className="portal-brand-row">
            <div className="portal-brand-left">Hackolution x HackNest</div>
            {originalPortalUrl && (
              <div className="portal-fallback-inline">
                <p className="portal-fallback-note">
                  If this page is not working properly, use native HackNest Team Portal.
                </p>
                <button className="portal-doc-link portal-native-btn" onClick={openOriginalPortal}>
                  <img src={HACKNEST_LOGO_URL} alt="HackNest" className="portal-native-logo-img" />
                  <span>Open HackNest Team Portal</span>
                </button>
              </div>
            )}
          </div>

          <h1 className="section-heading">{portalData.hackathon.name} Team Portal</h1>
          <p className="portal-subtitle">Team: {portalData.team.name}</p>

          {(portalData.hackathon.hackathon_logo_url || portalData.hackathon.institute_logo_url) && (
            <div className="portal-logo-strip">
              {portalData.hackathon.hackathon_logo_url && (
                <img
                  src={portalData.hackathon.hackathon_logo_url}
                  alt="Hackathon logo"
                  className="portal-logo"
                />
              )}
              {portalData.hackathon.institute_logo_url && (
                <img
                  src={portalData.hackathon.institute_logo_url}
                  alt="Institute logo"
                  className="portal-logo"
                />
              )}
            </div>
          )}

          {isTestMode && <p className="portal-test-badge">Test Mode Preview</p>}
        </header>

        <section className={`portal-status-banner tone-${statusMeta.tone}`}>
          <p className="portal-status-kicker">{statusMeta.badge}</p>
          <h2>{statusMeta.title}</h2>
          <p>{statusMeta.subtitle}</p>
        </section>

        <div className="portal-grid">
          <section className="portal-panel">
            <h2>Team Details</h2>
            <p><strong>Status:</strong> {portalData.team.status || 'pending'}</p>
            <div className="portal-people-list">
              <article className="portal-person-card">
                <p className="portal-person-role">Team Leader</p>
                <p className="portal-person-name">{portalData.team.leader.name}</p>
                <p className="portal-person-email">{portalData.team.leader.email}</p>
              </article>
              {portalData.team.members.map((member) => (
                <article key={member.id} className="portal-person-card">
                  <p className="portal-person-role">Team Member</p>
                  <p className="portal-person-name">{member.name}</p>
                  <p className="portal-person-email">{member.email}</p>
                </article>
              ))}
            </div>
          </section>

          {isRejected && (
            <section className="portal-panel">
              <h2>Application Update</h2>
              <div className="portal-message-card tone-danger-soft">
                <p>
                  Thank you for participating in <strong>{portalData.hackathon.name}</strong>. While this application was not selected,
                  we encourage your team to continue building and join upcoming opportunities.
                </p>
              </div>
            </section>
          )}

          {isWaitlisted && (
            <section className="portal-panel">
              <h2>Waitlist Update</h2>
              <div className="portal-message-card tone-warning-soft">
                <p>
                  Your team is currently waitlisted. If shortlisted teams drop out, organizers may promote your team.
                  Keep monitoring your email for updates.
                </p>
              </div>
            </section>
          )}

          {isShortlisted && (
            <section className="portal-panel portal-span-2">
              <h2>RSVP Confirmation</h2>
              <div className="portal-message-card tone-success-soft">
                <p>
                  Congratulations. Your team is shortlisted. Confirm attendees between {portalData.hackathon.min_team_size} and {portalData.hackathon.max_team_size}.
                </p>
              </div>

              {!portalData.hackathon.is_rsvp_open && !hasAnyRsvpConfirmed ? (
                <div className="portal-message-card tone-muted-soft">
                  <p>RSVP window is currently closed. Check back later or contact organizers.</p>
                </div>
              ) : hasAnyRsvpConfirmed ? (
                <div className="portal-rsvp-list">
                  <div className="portal-message-card tone-info-soft">
                    <p>RSVP is already submitted. Portal edits are locked; ask organizers for changes.</p>
                  </div>
                  <div className="portal-rsvp-row">
                    <div>
                      <p className="portal-person-name">{portalData.team.leader.name}</p>
                      <p className="portal-person-email">{portalData.team.leader.email}</p>
                    </div>
                    <span className={`portal-pill ${portalData.team.leader.rsvp ? 'pill-success' : 'pill-muted'}`}>
                      {portalData.team.leader.rsvp ? 'Attending' : 'Not Attending'}
                    </span>
                  </div>
                  {portalData.team.members.map((member) => (
                    <div key={member.id} className="portal-rsvp-row">
                      <div>
                        <p className="portal-person-name">{member.name}</p>
                        <p className="portal-person-email">{member.email}</p>
                      </div>
                      <span className={`portal-pill ${member.rsvp ? 'pill-success' : 'pill-muted'}`}>
                        {member.rsvp ? 'Attending' : 'Not Attending'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="portal-rsvp-list">
                    <label className={`portal-rsvp-row clickable ${rsvpSelections.leader ? 'selected' : ''}`}>
                      <div>
                        <p className="portal-person-name">{portalData.team.leader.name}</p>
                        <p className="portal-person-email">{portalData.team.leader.email}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={!!rsvpSelections.leader}
                        onChange={(event) => setRsvpSelections((prev) => ({ ...prev, leader: event.target.checked }))}
                      />
                    </label>
                    {portalData.team.members.map((member) => (
                      <label key={member.id} className={`portal-rsvp-row clickable ${rsvpSelections[member.id] ? 'selected' : ''}`}>
                        <div>
                          <p className="portal-person-name">{member.name}</p>
                          <p className="portal-person-email">{member.email}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={!!rsvpSelections[member.id]}
                          onChange={(event) =>
                            setRsvpSelections((prev) => ({ ...prev, [member.id]: event.target.checked }))
                          }
                        />
                      </label>
                    ))}
                  </div>
                  <div className="portal-requirement-note">
                    <p>
                      Requirement: Select {portalData.hackathon.min_team_size} to {portalData.hackathon.max_team_size} attendees.
                      Leader attendance is optional.
                    </p>
                    <p>Selected attendees: {selectedCount}</p>
                  </div>
                  <div className="portal-actions">
                    <button
                      className="portal-btn"
                      onClick={handleRsvpSubmit}
                      disabled={submittingRsvp || selectedCount === 0}
                    >
                      {submittingRsvp ? 'Submitting...' : 'Confirm RSVP'}
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {showSubmissionSection && (
            <section className="portal-panel portal-span-2">
              <h2>Idea Submission</h2>
              <div className={`portal-message-card ${portalData.hackathon.is_submission_open ? 'tone-info-soft' : 'tone-danger-soft'}`}>
                <p>
                  Submission window: {portalData.hackathon.is_submission_open ? 'OPEN' : 'CLOSED'}.
                  {portalData.hackathon.is_submission_open
                    ? ' Upload or replace your file during the open window.'
                    : ' Upload is disabled when the window is closed.'}
                </p>
              </div>

              <div className="portal-actions">
                {portalData.hackathon.template_url && (
                  <button className="portal-btn secondary" onClick={downloadTemplate}>Download Template</button>
                )}
                {portalData.team.has_submission && (
                  <button className="portal-btn secondary" onClick={downloadSubmission}>Download Submission</button>
                )}
                {portalData.team.has_submission && portalData.hackathon.is_submission_open && (
                  <button className="portal-btn danger" onClick={deleteSubmission} disabled={deleting}>
                    {deleting ? 'Deleting...' : 'Delete Submission'}
                  </button>
                )}
              </div>

              {portalData.hackathon.is_submission_open ? (
                <div className="portal-upload-box">
                  <p>{portalData.team.has_submission ? 'Replace your existing PDF submission' : 'Upload your PDF submission'}.</p>
                  <p className="portal-small-note">Accepted format: PDF. Max file size: 10MB.</p>
                  <label className="portal-upload-label">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading ? 'Uploading...' : portalData.team.has_submission ? 'Replace File' : 'Choose File'}
                  </label>
                  {uploadSuccess && <p className="portal-small-note success">Upload successful.</p>}
                </div>
              ) : (
                <div className="portal-upload-box muted">
                  <p>Submission is closed right now.</p>
                  {portalData.team.has_submission && (
                    <p className="portal-small-note">Your existing submission can still be downloaded.</p>
                  )}
                </div>
              )}

              <div className="portal-requirement-note">
                <p>Each new upload replaces the previous submission. Deletion is irreversible.</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
