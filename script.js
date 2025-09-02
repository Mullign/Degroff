// DeGroff Aviation Technologies — Interactions

// Initialize EmailJS (commented out until you get your keys)
// (function() {
//   emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
// })();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('#navMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Update year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Auto-show newsletter popup after page loads
window.addEventListener('load', () => {
  // Check if user has clicked "Never Show Again" (using localStorage)
  const neverShowAgain = localStorage.getItem('newsletterNeverShow');
  
  if (!neverShowAgain) {
    // Show popup after 3 seconds
    setTimeout(() => {
      openNewsletterModal();
    }, 3000);
  }
  
  // Initialize LinkedIn feed
  initLinkedInFeed();
});

// Newsletter modal functions
function openNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Don't set any localStorage here - popup will show again next time
  }
}

function neverShowNewsletter() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Mark that user never wants to see the popup again
    localStorage.setItem('newsletterNeverShow', 'true');
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('newsletterModal');
  if (e.target === modal) {
    closeNewsletterModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeNewsletterModal();
  }
});

// Email signup form with EmailJS
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.querySelector('input[type="email"]').value;
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    
    if (email) {
      // Show loading state
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // EmailJS parameters
      const templateParams = {
        to_email: 'info@degroffaviation.com', // Your email address
        from_email: email,
        subject: 'New Newsletter Subscription',
        message: `New newsletter subscription from: ${email}`,
        reply_to: email
      };
      
      // For now, just show success message (EmailJS will be added later)
      setTimeout(() => {
        alert('Thank you for subscribing! We\'ll keep you updated on PitotShield V2 news.');
        signupForm.reset();
        closeNewsletterModal();
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
      
      // TODO: Uncomment when EmailJS is set up
      // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      //   .then(function(response) {
      //     console.log('SUCCESS!', response.status, response.text);
      //     alert('Thank you for subscribing! We\'ll keep you updated on PitotShield V2 news.');
      //     signupForm.reset();
      //     closeNewsletterModal();
      //   }, function(error) {
      //     console.log('FAILED...', error);
      //     alert('Sorry, there was an error. Please try again or contact us directly.');
      //   })
      //   .finally(function() {
      //     // Reset button state
      //     submitBtn.textContent = originalText;
      //     submitBtn.disabled = false;
      //   });
    }
  });
}

// LinkedIn Feed Functionality
function initLinkedInFeed() {
  const feedContainer = document.getElementById('linkedinFeed');
  if (!feedContainer) return;
  
  // For now, we'll use a mock implementation since LinkedIn API requires authentication
  // In production, you would need to:
  // 1. Set up LinkedIn API access
  // 2. Create a backend service to fetch posts
  // 3. Handle authentication and rate limiting
  
  // Mock data for demonstration - based on DeGroff Aviation Technologies content
  const mockPosts = [
    {
      id: '1',
      author: 'DeGroff Aviation Technologies',
      date: '3 days ago',
      content: '🚀 Exciting news! Our PitotShield V2 SmartCover™ is now being used by multiple major airlines worldwide. The auto-releasing technology is preventing costly pitot tube damage and improving safety across the industry. #AviationSafety #PitotShieldV2 #Innovation',
      likes: 47,
      comments: 12,
      shares: 8
    },
    {
      id: '2',
      author: 'DeGroff Aviation Technologies',
      date: '1 week ago',
      content: '✈️ At the recent Aviation Maintenance Conference, we demonstrated how the PitotShield V2 eliminates human error in pitot tube protection. The heat-triggered auto-release feature ensures covers are never forgotten during pre-flight checks. #AviationMaintenance #SafetyFirst',
      likes: 29,
      comments: 7,
      shares: 4
    },
    {
      id: '3',
      author: 'DeGroff Aviation Technologies',
      date: '2 weeks ago',
      content: '🔧 Manufacturing excellence: Each PitotShield V2 is crafted with precision using SLS additive manufacturing and sintered pure polypropylene. No fabric to unravel, no maintenance headaches - just reliable protection when you need it most.',
      likes: 35,
      comments: 9,
      shares: 6
    },
    {
      id: '4',
      author: 'DeGroff Aviation Technologies',
      date: '3 weeks ago',
      content: '📈 Since 1985, DeGroff Aviation Technologies has been at the forefront of aviation safety innovation. Our PitotShield V2 represents 40 years of experience in protecting precision instruments. Thank you to our customers for trusting us with your safety needs.',
      likes: 52,
      comments: 15,
      shares: 11
    }
  ];
  
  // Simulate loading delay
  setTimeout(() => {
    renderLinkedInPosts(mockPosts);
  }, 2000);
}

function renderLinkedInPosts(posts) {
  const feedContainer = document.getElementById('linkedinFeed');
  if (!feedContainer) return;
  
  // Clear loading skeletons
  feedContainer.innerHTML = '';
  
  posts.forEach(post => {
    const postElement = createLinkedInPost(post);
    feedContainer.appendChild(postElement);
  });
}

function createLinkedInPost(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'linkedin-post';
  
  const initials = post.author.split(' ').map(word => word[0]).join('').substring(0, 2);
  
  postDiv.innerHTML = `
    <div class="post-header">
      <div class="post-avatar">${initials}</div>
      <div class="post-meta">
        <h4 class="post-author">${post.author}</h4>
        <p class="post-date">${post.date}</p>
      </div>
    </div>
    <div class="post-content">
      <p>${post.content}</p>
    </div>
    <div class="post-engagement">
      <div class="engagement-item">
        <i class="fa-solid fa-thumbs-up"></i>
        <span>${post.likes}</span>
      </div>
      <div class="engagement-item">
        <i class="fa-solid fa-comment"></i>
        <span>${post.comments}</span>
      </div>
      <div class="engagement-item">
        <i class="fa-solid fa-share"></i>
        <span>${post.shares}</span>
      </div>
    </div>
  `;
  
  return postDiv;
}

// Function to refresh LinkedIn feed (can be called periodically)
function refreshLinkedInFeed() {
  const feedContainer = document.getElementById('linkedinFeed');
  if (!feedContainer) return;
  
  // Show loading state
  feedContainer.innerHTML = `
    <div class="linkedin-post loading">
      <div class="post-skeleton">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>
  `;
  
  // In a real implementation, you would fetch fresh data here
  // For now, we'll just re-initialize with the same mock data
  setTimeout(() => {
    initLinkedInFeed();
  }, 1500);
}

// Auto-refresh LinkedIn feed every 30 minutes
setInterval(refreshLinkedInFeed, 30 * 60 * 1000);


