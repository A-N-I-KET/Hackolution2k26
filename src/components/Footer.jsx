import React from 'react';

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <img src="/assets/footer.png" alt="Hackolution 2K26 Footer" className="footer-img" />
            <div className="footer-overlay">
                <div className="footer-social">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">Discord</a>
                    <a href="mailto:hackolution2k26@gmail.com">Email</a>
                </div>
                <p className="footer-text">© 2026 Hackolution 2K26. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
