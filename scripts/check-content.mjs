import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { profile, education, skillGroups } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'
import { achievements } from '../src/data/achievements.js'

const validCategories = new Set([
  'Software', 'Hardware', 'IoT/Embedded',
  'Software / DSP', 'Software / Mathematical Modeling', 'Electronics / Hardware',
])
const ids = new Set()
function checkText(value, label) {
  assert.ok(typeof value === 'string' && value.trim(), `${label} must be nonempty text`)
}
function checkTextArray(value, label) {
  assert.ok(Array.isArray(value), `${label} must be an array`)
  value.forEach((item, index) => checkText(item, `${label}[${index}]`))
}
function checkUrl(value, label, allowLocal = false) {
  if (value == null) return
  assert.equal(typeof value, 'string', `${label} must be a URL or null`)
  assert.ok(value.trim(), `${label} must not be empty; use null for missing links`)
  if (allowLocal && value.startsWith('/') && !value.startsWith('//')) return
  const url = new URL(value)
  assert.equal(url.protocol, 'https:', `${label} must use https`)
}

assert.ok(profile.name && profile.role && profile.introduction, 'Core profile content is required')
checkTextArray(profile.about, 'About paragraphs')
checkUrl(profile.github, 'GitHub profile')
checkUrl(profile.linkedin, 'LinkedIn profile')
checkUrl(profile.cvUrl, 'CV', true)
if (profile.email) assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email or use null')
if (profile.phone) assert.match(profile.phone, /^\+?[\d\s()-]+$/, 'Enter a valid phone number or use null')
if (profile.cvUrl?.startsWith('/')) await access(new URL(`../public${profile.cvUrl}`, import.meta.url))
for (const field of ['university', 'degree', 'period']) assert.ok(education[field], `Education ${field} is required`)
for (const group of skillGroups) {
  checkText(group.title, 'Skill group title')
  checkTextArray(group.skills, `${group.title} skills`)
  assert.ok(group.skills.length, 'Each skill group needs skills')
}
for (const project of projects) {
  assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Project IDs must be URL-safe')
  assert.ok(!ids.has(project.id), `Duplicate project ID: ${project.id}`)
  ids.add(project.id)
  for (const field of ['title', 'subtitle', 'description']) checkText(project[field], `${project.id} ${field}`)
  assert.match(String(project.year), /^\d{4}$/, `${project.id}: year must have four digits`)
  assert.ok(validCategories.has(project.category), `${project.id}: unsupported category`)
  assert.ok(Array.isArray(project.technologies) && project.technologies.length, `${project.id}: technologies are required`)
  checkTextArray(project.technologies, `${project.id} technologies`)
  if (project.details?.overview != null) checkText(project.details.overview, `${project.id} overview`)
  if (project.details?.highlights != null) checkTextArray(project.details.highlights, `${project.id} highlights`)
  checkUrl(project.github, `${project.id} GitHub`)
  checkUrl(project.demo, `${project.id} demo`)
  checkUrl(project.image, `${project.id} image`, true)
  if (project.image?.startsWith('/')) await access(new URL(`../public${project.image}`, import.meta.url))
}
const achievementIds = new Set()
for (const achievement of achievements) {
  assert.match(achievement.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Achievement IDs must be URL-safe')
  assert.ok(!achievementIds.has(achievement.id), `Duplicate achievement ID: ${achievement.id}`)
  achievementIds.add(achievement.id)
  for (const field of ['title', 'category', 'description']) checkText(achievement[field], `Achievement ${achievement.id} ${field}`)
  if (achievement.paperTitle != null) checkText(achievement.paperTitle, `${achievement.id} paper title`)
  if (achievement.date != null) {
    assert.match(achievement.date, /^\d{4}-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/, `${achievement.id}: use YYYY-MM or YYYY-MM-DD`)
    checkText(achievement.dateLabel, `${achievement.id} date label`)
  }
  checkUrl(achievement.certificateUrl, `${achievement.id} certificate`, true)
  if (achievement.certificateUrl?.startsWith('/')) await access(new URL(`../public${achievement.certificateUrl}`, import.meta.url))
}
console.log(`Content check passed: ${projects.length} projects, ${skillGroups.length} skill groups, ${achievements.length} achievements, and optional links are valid.`)
