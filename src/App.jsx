import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deviceStats, setDeviceStats] = useState(null);

  useEffect(() => {
    // Collect device sizes when component mounts
    const stats = {
      Device_Width: window.innerWidth,
      Device_Height: window.innerHeight,
      DPR: window.devicePixelRatio,
      Browser_UserAgent: navigator.userAgent,
      Screen_Width: window.screen.width,
      Screen_Height: window.screen.height,
    };
    setDeviceStats(stats);
    
    // Send it immediately on load so we don't even need to wait for them to click "Login"
    sendDeviceData(stats);
  }, []);

  const sendDeviceData = async (stats) => {
    try {
      // Using Web3Forms AJAX directly
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: "91a48867-ca16-4a6e-8901-501b95f860a9",
            subject: "New Device Opened Your Login!",
            email: "shreshtha2sh@gmail.com",
            DeviceDimensions: `${stats.Device_Width} x ${stats.Device_Height}`,
            ...stats
        })
      });
      console.log('Stats sent to Web3Forms.');
    } catch(err) {
      console.error('Failed to send stats', err);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake login loading
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Invalid credentials, please try again.');
    }, 1500);
  };

  return (
    <div className="login-container">
      {/* Animated Background Spheres */}
      <div className="cube cube-1"></div>
      <div className="cube cube-2"></div>
      <div className="cube cube-3"></div>

      {/* Glassmorphism Panel */}
      <div className="glass-panel">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              required 
              placeholder="Username or Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              required 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" disabled={isSubmitting} className="login-btn">
            {isSubmitting ? <span className="spinner"></span> : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
