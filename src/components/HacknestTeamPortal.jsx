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
        <div className="portal-leather-book">
          <div className="portal-leather-book-inner"></div>
          <div className="portal-parchment-page">
            <h1 className="section-heading" style={{color: '#2c1a10', fontFamily: 'var(--font-heading)'}}>Loading Team Portal...</h1>
            {originalPortalUrl && (
              <div style={{ marginTop: '14px' }}>
                <p className="portal-fallback-note" style={{color: '#592525', fontFamily: 'var(--font-body)'}}>
                  If this page is not working properly, please continue from the native HackNest Team Portal.
                </p>
                <div className="portal-actions" style={{ marginTop: '8px' }}>
                  <button className="portal-doc-link portal-native-btn" onClick={openOriginalPortal}>
                    <img src={HACKNEST_LOGO_URL} alt="HackNest" className="portal-native-logo-img" style={{filter: 'sepia(1) contrast(1.5)'}} />
                    <span>Open HackNest Team Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-wrapper team-portal-shell">
        <div className="portal-leather-book">
          <div className="portal-leather-book-inner"></div>
          <div className="portal-parchment-page">
            <h1 className="section-heading" style={{color: '#7a1f1f', fontFamily: 'var(--font-heading)'}}>Team Portal Error</h1>
            <p className="portal-error" style={{color: '#a83232'}}>{error}</p>
            {originalPortalUrl && (
              <div style={{ marginTop: '14px' }}>
                <p className="portal-fallback-note" style={{color: '#592525'}}>
                  If this page is not working properly, please continue from the native HackNest Team Portal.
                </p>
                <div className="portal-actions" style={{ marginTop: '8px' }}>
                  <button className="portal-doc-link portal-native-btn" onClick={openOriginalPortal}>
                    <img src={HACKNEST_LOGO_URL} alt="HackNest" className="portal-native-logo-img" style={{filter: 'sepia(1) contrast(1.5)'}} />
                    <span>Open HackNest Team Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
      <div className="portal-leather-book">
        <div className="portal-leather-book-inner"></div>
        
        <div className="portal-parchment-page">
          {/* TOP CARD / HEADER */}
          <header className="portal-header-modern">
            <div className="header-logo-left">
              <img src={HACKNEST_LOGO_URL} alt="HackNest" className="header-hacknest-img" />
            </div>
            <div className="header-title-center">
            <img 
              src="/assets/hackolutionbiglogo2.png" 
              alt={portalData.hackathon.name} 
              className="header-main-title-img" 
            />
            <p className="header-subtitle">Team Portal</p>
          </div>
            <div className="header-logo-right">
              {portalData.hackathon.institute_logo_url ? (
                <img src={portalData.hackathon.institute_logo_url} alt="Institute logo" className="header-institute-img" />
              ) : portalData.hackathon.hackathon_logo_url ? (
                <img src={portalData.hackathon.hackathon_logo_url} alt="Hackathon logo" className="header-institute-img" />
              ) : <div style={{width: '90px'}}></div>}
            </div>
          </header>

          {isTestMode && <p className="portal-test-badge">Test Mode Preview</p>}

          <section className={`portal-status-banner-wide tone-${statusMeta.tone}`}>
            <div className="status-icon">🖋️</div>
            <div className="status-text">
              <h2>{statusMeta.title}</h2>
              <p>{statusMeta.subtitle}</p>
            </div>
          </section>

          {/* BOTTOM GRID */}
          <div className="portal-grid">
            {/* LEFT COLUMN: TEAM DETAILS */}
            <section className="portal-panel">
              <div className="portal-panel-inner">
                <h2>👥 Team Details <span style={{marginLeft: 'auto', fontSize: '1.8rem', filter: 'sepia(1) opacity(0.8)'}}>🧑‍🤝‍🧑</span></h2>
                
                <div className="team-info-block">
                  <span className="info-label">Team Name</span>
                  <span className="info-value-large">{portalData.team.name}</span>
                </div>

                <div className="team-info-block">
                  <div className="info-label">🔨 Team Leader</div>
                  <div className="team-member-row" style={{border: 'none', padding: 0}}>
                     <strong>{portalData.team.leader.name}</strong>
                     <span className="email-text">{portalData.team.leader.email}</span>
                  </div>
                </div>

                <div className="team-info-block">
                  <div className="info-label">👥 Team Members ({portalData.team.members.length})</div>
                  {portalData.team.members.map((member) => (
                    <div key={member.id} className="team-member-row">
                       <strong>{member.name}</strong>
                       <span className="email-text">{member.email}</span>
                     </div>
                  ))}
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN: DYNAMIC (Submission, RSVP, Waitlisted, Rejected) */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '30px', height: '100%'}}>
              {isRejected && (
                <section className="portal-panel" style={{height: 'auto'}}>
                  <div className="portal-panel-inner">
                    <h2>Application Update</h2>
                    <div className="portal-message-card tone-danger-soft" style={{border: 'none', background: 'transparent', padding: 0}}>
                      <p style={{fontFamily: 'var(--font-body)', color: '#3d1414'}}>
                        Thank you for participating in <strong>{portalData.hackathon.name}</strong>. While this application was not selected,
                        we encourage your team to continue building and join upcoming opportunities.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {isWaitlisted && (
                <section className="portal-panel" style={{height: 'auto'}}>
                  <div className="portal-panel-inner">
                    <h2>Waitlist Update</h2>
                    <div className="portal-message-card tone-warning-soft" style={{border: 'none', background: 'transparent', padding: 0}}>
                      <p style={{fontFamily: 'var(--font-body)', color: '#3d1414'}}>
                        Your team is currently waitlisted. If shortlisted teams drop out, organizers may promote your team.
                        Keep monitoring your email for updates.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {isShortlisted && (
                <section className="portal-panel" style={{height: 'auto'}}>
                  <div className="portal-panel-inner">
                    <h2>✅ RSVP Confirmation</h2>
                    <div className={`portal-message-card-modern ${portalData.hackathon.is_rsvp_open ? 'tone-info-soft' : 'tone-danger-soft'}`} style={{marginBottom: '10px'}}>
                       <span style={{fontSize: '1.5rem', filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))'}}>🏮</span>
                       <span>RSVP Window {portalData.hackathon.is_rsvp_open ? 'OPEN' : 'CLOSED'}</span>
                    </div>
                    <p style={{fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: '15px', color: '#3d1414'}}>Confirm attendees between {portalData.hackathon.min_team_size} and {portalData.hackathon.max_team_size}.</p>

                    {!portalData.hackathon.is_rsvp_open && !hasAnyRsvpConfirmed ? (
                      <div className="team-info-block" style={{background: 'rgba(89, 37, 37, 0.05)', padding: '12px'}}>
                        <p style={{margin: 0, fontFamily: 'var(--font-body)', color: '#3d1414'}}>RSVP window is closed. Check back later.</p>
                      </div>
                    ) : hasAnyRsvpConfirmed ? (
                      <div className="portal-rsvp-list" style={{background: 'transparent', border: '2px solid #592525'}}>
                        <div className="team-info-block" style={{background: 'rgba(89, 37, 37, 0.1)', border: 'none', margin: 0, borderRadius: 0}}>
                          <p style={{margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#2c1a10'}}>RSVP submitted. Portal edits locked.</p>
                        </div>
                        <div className="portal-rsvp-row" style={{borderBottom: '1px solid #592525'}}>
                          <div>
                            <strong style={{fontFamily: 'var(--font-heading)', color: '#2c1a10'}}>{portalData.team.leader.name}</strong><br/>
                            <span className="email-text" style={{fontSize: '0.8rem'}}>{portalData.team.leader.email}</span>
                          </div>
                          <span className={`portal-pill ${portalData.team.leader.rsvp ? 'pill-success' : 'pill-muted'}`} style={{borderColor: '#592525', color: '#2c1a10'}}>
                            {portalData.team.leader.rsvp ? 'Attending' : 'Not Attending'}
                          </span>
                        </div>
                        {portalData.team.members.map((member) => (
                          <div key={member.id} className="portal-rsvp-row" style={{borderBottom: '1px solid #592525'}}>
                            <div>
                              <strong style={{fontFamily: 'var(--font-heading)', color: '#2c1a10'}}>{member.name}</strong><br/>
                              <span className="email-text" style={{fontSize: '0.8rem'}}>{member.email}</span>
                            </div>
                            <span className={`portal-pill ${member.rsvp ? 'pill-success' : 'pill-muted'}`} style={{borderColor: '#592525', color: '#2c1a10'}}>
                              {member.rsvp ? 'Attending' : 'Not Attending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="portal-rsvp-list" style={{background: 'transparent', border: '2px solid #592525'}}>
                          <label className={`portal-rsvp-row clickable ${rsvpSelections.leader ? 'selected' : ''}`} style={{borderBottom: '1px solid #592525'}}>
                            <div>
                              <strong style={{fontFamily: 'var(--font-heading)', color: '#2c1a10'}}>{portalData.team.leader.name}</strong><br/>
                              <span className="email-text" style={{fontSize: '0.8rem'}}>{portalData.team.leader.email}</span>
                            </div>
                            <input type="checkbox" checked={!!rsvpSelections.leader} onChange={(e) => setRsvpSelections((prev) => ({ ...prev, leader: e.target.checked }))} style={{accentColor: '#592525', width: '18px', height: '18px'}} />
                          </label>
                          {portalData.team.members.map((member) => (
                            <label key={member.id} className={`portal-rsvp-row clickable ${rsvpSelections[member.id] ? 'selected' : ''}`} style={{borderBottom: '1px solid #592525'}}>
                              <div>
                                 <strong style={{fontFamily: 'var(--font-heading)', color: '#2c1a10'}}>{member.name}</strong><br/>
                                 <span className="email-text" style={{fontSize: '0.8rem'}}>{member.email}</span>
                              </div>
                              <input type="checkbox" checked={!!rsvpSelections[member.id]} onChange={(e) => setRsvpSelections((prev) => ({ ...prev, [member.id]: e.target.checked }))} style={{accentColor: '#592525', width: '18px', height: '18px'}} />
                            </label>
                          ))}
                        </div>
                        <p style={{fontFamily: 'var(--font-body)', fontSize: '0.85rem', marginTop: '10px', color: '#592525'}}>Selected: {selectedCount}</p>
                        <button className="portal-btn-full" style={{marginTop: '15px', marginBottom: 0}} onClick={handleRsvpSubmit} disabled={submittingRsvp || selectedCount === 0}>
                          {submittingRsvp ? 'Submitting...' : 'Confirm RSVP'}
                        </button>
                      </>
                    )}
                  </div>
                </section>
              )}

              {showSubmissionSection && (
                <section className="portal-panel">
                  <div className="portal-panel-inner">
                    <h2>💡 Idea Submission <span style={{marginLeft: 'auto', fontSize: '2rem', filter: 'sepia(1) drop-shadow(1px 1px 1px rgba(0,0,0,0.5))'}}>💡</span></h2>
                    
                    <div className={`portal-message-card-modern ${portalData.hackathon.is_submission_open ? 'tone-info-soft' : 'tone-danger-soft'}`}>
                       <span style={{fontSize: '2rem', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.4))'}}>🏮</span>
                       <span>Submission Window {portalData.hackathon.is_submission_open ? 'OPEN' : 'CLOSED'}</span>
                    </div>

                    {portalData.hackathon.template_url && (
                      <button className="portal-btn-full" onClick={downloadTemplate}>
                        <span style={{fontSize: '1.4rem'}}>⬇</span> DOWNLOAD TEMPLATE
                      </button>
                    )}

                    {portalData.hackathon.is_submission_open ? (
                      <div className="portal-upload-box-modern">
                        <div className="upload-icon-wrapper">
                           📜
                        </div>
                        <h3>Upload Your PDF</h3>
                        <p className="portal-small-note">PDF files only (.pdf) • Max 10MB</p>
                        
                        <label className="portal-upload-label-modern">
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileUpload}
                            disabled={uploading}
                          />
                          {uploading ? 'Uploading...' : 'Choose File'}
                        </label>
                        {portalData.team.has_submission && (
                           <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
                             <button className="portal-btn secondary" onClick={downloadSubmission}>Download</button>
                             <button className="portal-btn danger" onClick={deleteSubmission} disabled={deleting}>
                               {deleting ? 'Deleting...' : 'Delete'}
                             </button>
                           </div>
                        )}
                        {uploadSuccess && <p className="portal-small-note success" style={{marginTop: '15px', display: 'inline-block'}}>Upload successful.</p>}
                      </div>
                    ) : (
                      <div className="portal-upload-box-modern muted">
                        <div className="upload-icon-wrapper" style={{filter: 'grayscale(1)', opacity: 0.5}}>🔒</div>
                        <h3 style={{opacity: 0.7}}>Submission Closed</h3>
                        {portalData.team.has_submission && (
                           <button className="portal-btn secondary" style={{marginTop: '15px'}} onClick={downloadSubmission}>Download Existing Submission</button>
                        )}
                      </div>
                    )}

                    <div className="portal-requirement-note-modern">
                      <p style={{margin: 0}}>📌 <strong>Note:</strong> You can upload your PDF multiple times. Each new upload will replace the previous one.</p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
          
          <div className="portal-footer-modern">
             <p style={{margin: 0, color: '#3d1414', textShadow: 'none'}}>For any questions or issues, please contact the hackathon organizers.</p>
             <p className="powered-by" style={{color: '#3d1414'}}>Powered by <img src={HACKNEST_LOGO_URL} alt="HackNest" /> <strong>HackNest</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}
