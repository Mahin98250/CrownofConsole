import { existsSync, readFileSync } from 'node:fs'
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const app = read('../src/App.jsx')
const css = read('../src/style.css')
const html = read('../index.html')
const vite = read('../vite.config.js')
const failures = []
const requireCheck = (condition, message) => { if (!condition) failures.push(message) }
const expectedGames = ['EA SPORTS FC 27','GRAND THEFT AUTO V','EA SPORTS FC 26','GRAN TURISMO 7','NBA 2K26','CALL OF DUTY: BLACK OPS 7',"MARVEL'S SPIDER-MAN 2",'IT TAKES TWO','MINECRAFT']
requireCheck(app.includes('const GAME_GALLERY = ['), 'Game gallery data array is missing.')
for (const title of expectedGames) requireCheck(app.includes(`title: '${title}'`) || app.includes(`title: "${title}"`), `Game is missing: ${title}`)
requireCheck((app.match(/function GameplayCard\(/g) || []).length === 1, 'Reusable GameplayCard component must exist exactly once.')
requireCheck(app.includes('onError={() => setImageFailed(true)}'), 'Game image error fallback is missing.')
requireCheck(app.includes('imageFailed ? controllerPhoto : GAME_GALLERY[0].src'), 'Splash image local fallback is missing.')
requireCheck(!app.includes('YOUR LOGO'), 'A public YOUR LOGO placeholder remains.')
for (const route of ['home','space','games','experiences','visit','contact']) requireCheck(app.includes(`['${route}'`), `Core route is missing: ${route}`)
requireCheck(app.includes('coc-analytics-consent') && app.includes('catch'), 'Analytics storage guard is missing.')
requireCheck(css.includes('.gameplay-frame-fallback') && css.includes('.gameplay-image-placeholder'), 'Visible image fallback styles are missing.')
requireCheck(css.includes('@media(prefers-reduced-motion:reduce)'), 'Reduced-motion support is missing.')
requireCheck(html.includes('<title>The Crown Of Console'), 'SEO title is missing.')
requireCheck(html.includes('application/ld+json'), 'LocalBusiness structured data is missing.')
requireCheck(vite.includes("base: '/CrownofConsole/'"), 'GitHub Pages base path is incorrect.')
requireCheck(existsSync(new URL('../src/assets/crown-controller-studio.webp', import.meta.url)), 'Local splash fallback asset is missing.')
if (failures.length) { console.error('Crown Of Console quality check failed:'); for (const failure of failures) console.error(` - ${failure}`); process.exitCode = 1 }
else console.log(`Crown Of Console quality check passed: ${expectedGames.length} games, media fallbacks, core routes, SEO and deployment paths.`)
