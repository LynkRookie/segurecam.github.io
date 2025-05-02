document.addEventListener('DOMContentLoaded', function() {
    // Get camera ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const cameraId = urlParams.get('id') || '1';
    
    // Update camera ID in the UI
    document.getElementById('camera-id').textContent = cameraId;
    document.getElementById('overlay-camera-id').textContent = cameraId;
    
    // Camera data (simulated)
    function getCameraLocation(id) {
        // Replace with your actual location data or API call
        const locations = {
            '1': 'Entrada Principal',
            '2': 'Patio Trasero',
            '3': 'Garaje',
            '4': 'Salón'
        };
        return locations[id] || 'Desconocida';
    }

    const cameraData = {
        id: cameraId,
        name: `Cámara ${cameraId}`,
        location: getCameraLocation(cameraId),
        ip: '192.168.1.100',
        port: '554',
        protocol: 'rtsp',
        enabled: true,
        audio: true,
        hasMotion: cameraId === '2', // Only camera 2 has motion detection for demo
    };
    
    // Update camera location in the UI
    document.getElementById('camera-location').textContent = cameraData.location;
    document.getElementById('overlay-camera-location').textContent = cameraData.location;
    document.getElementById('camera-name').value = cameraData.name;
    document.getElementById('camera-location-input').value = cameraData.location;
    
    // Show motion badge if camera has motion
    if (cameraData.hasMotion) {
        document.getElementById('motion-badge').classList.remove('hidden');
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Search toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchClose = document.querySelector('.search-close');
    
    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', function() {
            searchContainer.classList.remove('hidden');
            searchToggle.classList.add('hidden');
            searchContainer.querySelector('input').focus();
        });
    }
    
    if (searchClose && searchContainer && searchToggle) {
        searchClose.addEventListener('click', function() {
            searchContainer.classList.add('hidden');
            searchToggle.classList.remove('hidden');
        });
    }
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the closest tabs container
            const tabsContainer = button.closest('.tabs');
            if (!tabsContainer) return;
            
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes in this container
            tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            tabsContainer.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            tabsContainer.querySelector(`#${tabId}`).classList.add('active');
        });
    });
    
    // Video player functionality
    const video = document.getElementById('camera-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const muteBtn = document.getElementById('mute-btn');
    const volumeIcon = document.getElementById('volume-icon');
    const muteIcon = document.getElementById('mute-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const recordBtn = document.getElementById('record-btn');
    const recordingBadge = document.getElementById('recording-badge');
    const snapshotBtn = document.getElementById('snapshot-btn');
    const progressFill = document.querySelector('.progress-fill');
    const progressTime = document.querySelector('.progress-time');
    const progressDuration = document.querySelector('.progress-duration');
    const progressTrack = document.querySelector('.progress-track');
    
    let isRecording = false;
    
    if (video) {
        // Initialize video
        video.volume = volumeSlider.value / 100;
        
        // Play/Pause
        playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        
        function togglePlay() {
            if (video.paused) {
                video.play();
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                video.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }
        
        // Mute/Unmute
        muteBtn.addEventListener('click', toggleMute);
        
        function toggleMute() {
            video.muted = !video.muted;
            if (video.muted) {
                volumeIcon.classList.add('hidden');
                muteIcon.classList.remove('hidden');
            } else {
                volumeIcon.classList.remove('hidden');
                muteIcon.classList.add('hidden');
            }
        }
        
        // Volume
        volumeSlider.addEventListener('input', function() {
            video.volume = this.value / 100;
            if (this.value == 0) {
                volumeIcon.classList.add('hidden');
                muteIcon.classList.remove('hidden');
                video.muted = true;
            } else if (video.muted) {
                volumeIcon.classList.remove('hidden');
                muteIcon.classList.add('hidden');
            }
        });
        
        // Fullscreen
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                video.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }
        
        // Record
        recordBtn.addEventListener('click', toggleRecord);
        
        function toggleRecord() {
            isRecording = !isRecording;
            if (isRecording) {
                recordingBadge.classList.remove('hidden');
                recordBtn.classList.add('recording');
            } else {
                recordingBadge.classList.add('hidden');
                recordBtn.classList.remove('recording');
            }
        }
        
        // Snapshot
        snapshotBtn.addEventListener('click', takeSnapshot);
        
        function takeSnapshot() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'snapshot.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Progress bar
        video.addEventListener('timeupdate', updateProgress);
        
        function updateProgress() {
            const percentage = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${percentage}%`;
            progressTime.textContent = formatTime(video.currentTime);
            progressDuration.textContent = formatTime(video.duration);
        }
        
        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        progressTrack.addEventListener('click', setProgress);
        
        function setProgress(e) {
            const width = this.offsetWidth;
            const clickX = e.offsetX;
            const duration = video.duration;
            video.currentTime = (clickX / width) * duration;
        }
    }
});