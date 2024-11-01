import React, { useState, useRef, useEffect } from 'react';

const Main = () => {
  const [theme, setTheme] = useState('dark');
  const [imageCaptured, setImageCaptured] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const [captionColor, setCaptionColor] = useState('black');
  const [captionSize, setCaptionSize] = useState(16);
  const [captionBgColor, setCaptionBgColor] = useState('white');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const startVideoStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width, 0); // Move the canvas context to the right
    context.scale(-1, 1); // Flip the image horizontally
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    context.restore();
    setImageCaptured(true);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'selfie.png';
    link.click();
  };

  const resetImage = () => {
    setImageCaptured(false);
    setCaptionText('');
    setCaptionColor('black');
    setCaptionSize(16);
    setCaptionBgColor('white');
  };

  const deleteImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setImageCaptured(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const drawCaption = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const padding = 10;
    const captionHeight = captionSize * 2;

    context.clearRect(0, canvas.height - captionHeight - padding, canvas.width, captionHeight + padding * 2);
    context.fillStyle = captionBgColor;
    context.fillRect(0, canvas.height - captionHeight - padding, canvas.width, captionHeight + padding * 2);

    context.fillStyle = captionColor;
    context.font = `${captionSize}px Arial`;
    context.textAlign = 'center';
    context.fillText(captionText, canvas.width / 2, canvas.height - padding);
  };

  const handleSaveCaption = () => {
    drawCaption();
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <article style={{ textAlign: 'center' }}>
        <h1 id="header">My Faces</h1>
        
        <div style={{
          display: 'inline-block',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '1em'
        }}>
          <video
            ref={videoRef}
            style={{ display: imageCaptured ? 'none' : 'block', maxWidth: '100%', borderRadius: '10px' }}
            width="640"
            height="480"
          ></video>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{
              display: imageCaptured ? 'block' : 'none',
              padding: '10px',
              backgroundColor: 'white',
              border: '5px solid black',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
            }}
          ></canvas>
        </div>

        <div style={{ marginTop: '1em' }}>
          {!imageCaptured ? (
            <>
              <button onClick={startVideoStream}>Start Camera</button>
              <button onClick={captureSelfie}>Capture Selfie</button>
            </>
          ) : (
            <>
              <button onClick={downloadImage}>Download Photo</button>
              <button onClick={resetImage}>Reset</button>
              <button onClick={deleteImage}>Delete</button>
            </>
          )}
        </div>

        <button onClick={toggleTheme} style={{ marginTop: '1em' }}>
          Change Theme
        </button>

        {imageCaptured && (
          <div style={{ marginTop: '1em' }}>
            <h3>Add Caption</h3>
            <input
              type="text"
              placeholder="Enter caption"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
            />
            <div>
              <label>Font Color:</label>
              <select onChange={(e) => setCaptionColor(e.target.value)} value={captionColor}>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
              </select>
            </div>
            <div>
              <label>Font Size:</label>
              <input
                type="number"
                min="10"
                max="50"
                value={captionSize}
                onChange={(e) => setCaptionSize(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Background Color:</label>
              <select onChange={(e) => setCaptionBgColor(e.target.value)} value={captionBgColor}>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
              </select>
            </div>
            <button onClick={handleSaveCaption}>Save Caption</button>
          </div>
        )}
      </article>
    </main>
  );
};

export default Main;
