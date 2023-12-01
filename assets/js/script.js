// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n')
    element.textContent = langData[key]
  })
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang)
  location.reload()
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`)
  return response.json()
}

// Function to change language
async function changeLanguage(lang) {
  await setLanguagePreference(lang)

  const langData = await fetchLanguageData(lang)
  updateContent(langData)
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
  const userPreferredLanguage = localStorage.getItem('language') || 'pt-BR'
  const langData = await fetchLanguageData(userPreferredLanguage)
  updateContent(langData)
})

// Button back to top
const backToTopButton = document.querySelector('.back-to-top')

const backToTop = () => {
  if (window.scrollY >= 100) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

window.addEventListener('scroll', function () {
  backToTop()
})
