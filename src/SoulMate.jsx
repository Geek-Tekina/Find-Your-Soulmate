import React, { useState, useEffect, useRef } from "react";

const SoulmateApp = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [cameraClosed, setCameraClosed] = useState(false);

  const handleFindSoulmate = () => {
    if (name.trim() && age.trim() && gender.trim()) {
      setShowCamera(true);
      setCameraClosed(false); // Reset cameraClosed when starting camera
    } else {
      alert("Please fill in all the fields!");
    }
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-image: url('https://img.freepik.com/free-photo/silhouetted-couple-sit-bench-autumn-tree-generative-ai_188544-12574.jpg?ga=GA1.1.733113356.1739522528&semt=ais_hybrid'),repeating-linear-gradient(45deg, #000, #000 10px, #0000 10px, #0000 20px);
          
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .app-container {
          text-align: center;
          padding: 20px;
          position: relative;
        }

        .title {
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 20px;
          font-weight: bold;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        .input-container {
          margin-top: 20px;
        }

        .name-input,
        .age-input,
        .gender-input {
          padding: 10px;
          font-size: 18px;
          border-radius: 5px;
          border: none;
          width: 250px;
          margin-right: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
        }

        .find-button {
          padding: 10px 20px;
          font-size: 18px;
          background-color: #ff1493;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .find-button:hover {
          background-color: #ff69b4;
        }

        .camera-container {
            height: 70vh;
            width: 100%;
          position: relative;
        }

        .soulmate-message {
          font-size: 2rem;
          color: #fff;
          margin-bottom: 20px;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        .camera-feed {
          border-radius: 10px;
          border: 5px solid #ff1493;
        }

        .romantic-message {
          font-size: 1.5rem;
          color: #fff;
          margin-top: 20px;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        .sarcastic-message {
          font-size: 2rem;
          color: #fff;
          margin-top: 50px;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        .exit-button {
          padding: 15px 30px;
          background-color: #ff1493;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
          margin-top: 20px;
        }

        .exit-button:hover {
          background-color: #ff69b4;
        }

        .dark-page {
          background-color: rgba(0, 0, 0, 0.8);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          height: 100vh;
          width: 100vw;
        }

      `}</style>

      {!showCamera && !cameraClosed ? (
        <>
          <h1 className="title">Find Your Soulmate ❤️ on this Valentine</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
            <input
              type="number"
              placeholder="Enter Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="age-input"
            />
            <input
              type="text"
              placeholder="Enter Your Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="gender-input"
            />
            <button onClick={handleFindSoulmate} className="find-button">
              Meet Your Soulmate
            </button>
          </div>
        </>
      ) : cameraClosed ? (
        <div className="dark-page">
          <h2 className="sarcastic-message">
            You closed the camera... Why? Afraid of meeting your soulmate? 😂
            <br />
            Well, that’s it. Your soulmate is gone. 😅
          </h2>
        </div>
      ) : (
        <CameraComponent name={name} setCameraClosed={setCameraClosed} />
      )}
    </div>
  );
};

const CameraComponent = ({ name, setCameraClosed }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // If the camera access is denied or failed, show sarcasm and end the app
        setCameraClosed(true);
        console.error("Camera access denied", err);
      }
    };

    getCameraStream();

    return () => {
      // Cleanup: stop the camera stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [setCameraClosed]);

  return (
    <div className="camera-container">
      <h2 className="soulmate-message">
        Your POOKIE 😽😻 Soulmate is Here! 😍
      </h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="300px"
        className="camera-feed"
      ></video>
      <div className="romantic-message">
        <p>
          Hey {name.split(" ")[0]}, remember, the most important relationship is
          the one you have with yourself 💖.
        </p>
        <p>
          Embrace your uniqueness, love yourself, and know that you are amazing
          just the way you are! 🌟
        </p>
      </div>
    </div>
  );
};

export default SoulmateApp;
