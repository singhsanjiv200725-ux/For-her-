// Music player functionality
class MusicPlayer {
  constructor() {
    this.songs = [
      { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", src: "/placeholder.mp3" },
      { title: "All of Me", artist: "John Legend", duration: "4:29", src: "/placeholder.mp3" },
      { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41", src: "/placeholder.mp3" },
      { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45", src: "/placeholder.mp3" },
      { title: "Make You Feel My Love", artist: "Adele", duration: "3:32", src: "/placeholder.mp3" },
      { title: "Can't Help Myself", artist: "Four Tops", duration: "2:58", src: "/placeholder.mp3" },
      { title: "At Last", artist: "Etta James", duration: "3:01", src: "/placeholder.mp3" },
      { title: "Better Days", artist: "OneRepublic", duration: "2:54", src: "/placeholder.mp3" },
      { title: "Marry Me", artist: "Train", duration: "3:58", src: "/placeholder.mp3" },
      { title: "Lucky", artist: "Jason Mraz & Colbie Caillat", duration: "3:12", src: "/placeholder.mp3" },
      { title: "Just the Way You Are", artist: "Bruno Mars", duration: "3:40", src: "/placeholder.mp3" },
      { title: "Love Story", artist: "Taylor Swift", duration: "3:55", src: "/placeholder.mp3" },
      { title: "Speechless", artist: "Dan + Shay", duration: "3:21", src: "/placeholder.mp3" },
      { title: "Unconditionally", artist: "Katy Perry", duration: "3:48", src: "/placeholder.mp3" },
      { title: "Beautiful Boy", artist: "John Lennon", duration: "2:54", src: "/placeholder.mp3" },
    ]

    this.currentSongIndex = 0
    this.isPlaying = false
    this.audio = document.getElementById("audioPlayer")

    this.initializeElements()
    this.attachEventListeners()
  }

  initializeElements() {
    this.playPauseBtn = document.getElementById("playPauseBtn")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.currentSongEl = document.getElementById("currentSong")
    this.currentArtistEl = document.getElementById("currentArtist")
    this.progressBar = document.getElementById("progressBar")
    this.progress = document.getElementById("progress")
    this.currentTimeEl = document.getElementById("currentTime")
    this.durationEl = document.getElementById("duration")
    this.musicItems = document.querySelectorAll(".music-item")
    this.playBtns = document.querySelectorAll(".play-btn")
  }

  attachEventListeners() {
    // Main player controls
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause())
    this.prevBtn.addEventListener("click", () => this.previousSong())
    this.nextBtn.addEventListener("click", () => this.nextSong())

    // Progress bar
    this.progressBar.addEventListener("click", (e) => this.setProgress(e))

    // Individual song play buttons
    this.playBtns.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        this.playSong(index)
      })
    })

    // Music item clicks
    this.musicItems.forEach((item, index) => {
      item.addEventListener("click", () => this.playSong(index))
    })

    // Audio events
    this.audio.addEventListener("timeupdate", () => this.updateProgress())
    this.audio.addEventListener("ended", () => this.nextSong())
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration())
  }

  playSong(index) {
    this.currentSongIndex = index
    const song = this.songs[index]

    // Update UI
    this.updateSongInfo(song)
    this.updateActiveItem()

    // Since we don't have actual audio files, we'll simulate playback
    this.simulatePlayback()

    this.isPlaying = true
    this.updatePlayButton()
  }

  simulatePlayback() {
    // This simulates audio playback without actual files
    // In a real implementation, you would set this.audio.src = song.src and call this.audio.play()
    console.log(`[v0] Playing: ${this.songs[this.currentSongIndex].title}`)

    // Simulate progress for demo purposes
    this.simulateProgress()
  }

  simulateProgress() {
    // Clear any existing interval
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }

    let currentTime = 0
    const duration = this.parseDuration(this.songs[this.currentSongIndex].duration)

    this.progressInterval = setInterval(() => {
      if (this.isPlaying && currentTime < duration) {
        currentTime += 1
        this.updateProgressDisplay(currentTime, duration)
      } else if (currentTime >= duration) {
        this.nextSong()
      }
    }, 1000)
  }

  parseDuration(durationStr) {
    const [minutes, seconds] = durationStr.split(":").map(Number)
    return minutes * 60 + seconds
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  updateProgressDisplay(currentTime, duration) {
    const progressPercent = (currentTime / duration) * 100
    this.progress.style.width = `${progressPercent}%`
    this.currentTimeEl.textContent = this.formatTime(currentTime)
    this.durationEl.textContent = this.formatTime(duration)
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseSong()
    } else {
      if (this.currentSongIndex === null) {
        this.playSong(0)
      } else {
        this.resumeSong()
      }
    }
  }

  pauseSong() {
    this.isPlaying = false
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
    this.updatePlayButton()
    console.log("[v0] Paused")
  }

  resumeSong() {
    this.isPlaying = true
    this.simulateProgress()
    this.updatePlayButton()
    console.log("[v0] Resumed")
  }

  previousSong() {
    const prevIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.songs.length - 1
    this.playSong(prevIndex)
  }

  nextSong() {
    const nextIndex = this.currentSongIndex < this.songs.length - 1 ? this.currentSongIndex + 1 : 0
    this.playSong(nextIndex)
  }

  updateSongInfo(song) {
    this.currentSongEl.textContent = song.title
    this.currentArtistEl.textContent = song.artist
  }

  updateActiveItem() {
    // Remove active class from all items
    this.musicItems.forEach((item) => item.classList.remove("active"))

    // Add active class to current item
    if (this.musicItems[this.currentSongIndex]) {
      this.musicItems[this.currentSongIndex].classList.add("active")
    }

    // Update play button icons
    this.playBtns.forEach((btn, index) => {
      const icon = btn.querySelector("i")
      if (index === this.currentSongIndex && this.isPlaying) {
        icon.className = "fas fa-pause"
      } else {
        icon.className = "fas fa-play"
      }
    })
  }

  updatePlayButton() {
    const icon = this.playPauseBtn.querySelector("i")
    icon.className = this.isPlaying ? "fas fa-pause" : "fas fa-play"
    this.updateActiveItem()
  }

  setProgress(e) {
    const width = this.progressBar.clientWidth
    const clickX = e.offsetX
    const duration = this.parseDuration(this.songs[this.currentSongIndex].duration)
    const newTime = (clickX / width) * duration

    // In a real implementation, you would set this.audio.currentTime = newTime
    console.log(`[v0] Seeking to: ${this.formatTime(newTime)}`)
  }

  updateProgress() {
    // This would be called by the actual audio timeupdate event
    // Currently handled by simulateProgress()
  }

  updateDuration() {
    // This would be called when audio metadata is loaded
    // Currently handled in playSong()
  }
}

// Initialize the music player when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new MusicPlayer()
})
