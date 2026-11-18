import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { profile, education, skillGroups } from '../src/data/profile.js'
import { projectCategories, projects } from '../src/data/projects.js'
import { achievements } from '../src/data/achievements.js'

const validCategories = new Set(projectCategories.filter((category) => category !== 'All'))
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

async function checkAsset(value, label) {
  checkUrl(value, label, true)
  if (value?.startsWith('/')) await access(new URL(`../public${value}`, import.meta.url))
}

assert.ok(profile.name && profile.introduction, 'Core profile content is required')
checkTextArray(profile.about, 'About paragraphs')
checkUrl(profile.github, 'GitHub profile')
checkUrl(profile.linkedin, 'LinkedIn profile')
await checkAsset(profile.cvUrl, 'CV')
await checkAsset('/images/portfolio-share.jpg', 'Social preview image')
if (profile.email) assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email or use null')
if (profile.phone) assert.match(profile.phone, /^\+?[\d\s()-]+$/, 'Enter a valid phone number or use null')
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
  for (const field of ['title', 'description']) checkText(project[field], `${project.id} ${field}`)
  assert.match(String(project.year), /^\d{4}$/, `${project.id}: year must have four digits`)
  assert.ok(validCategories.has(project.category), `${project.id}: unsupported category`)
  assert.ok(Array.isArray(project.technologies) && project.technologies.length, `${project.id}: technologies are required`)
  checkTextArray(project.technologies, `${project.id} technologies`)
  checkText(project.details?.overview, `${project.id} overview`)
  if (project.details?.highlights != null) checkTextArray(project.details.highlights, `${project.id} highlights`)
  checkUrl(project.github, `${project.id} GitHub`)
  checkUrl(project.demo, `${project.id} demo`)
  if (project.evidence) {
    const { label, steps, image, video, audio } = project.evidence
    checkText(label, `${project.id} evidence label`)
    if (steps) checkTextArray(steps, `${project.id} diagram steps`)
    if (image) {
      checkText(image.alt, `${project.id} image description`)
      await checkAsset(image.src, `${project.id} image`)
    }
    if (video) {
      checkText(video.label, `${project.id} video label`)
      await checkAsset(video.src, `${project.id} video`)
      await checkAsset(video.captions, `${project.id} video captions`)
    }
    for (const clip of audio ?? []) {
      checkText(clip.label, `${project.id} audio label`)
      await checkAsset(clip.src, `${project.id} audio`)
    }
  }
}
const achievementIds = new Set()
for (const achievement of achievements) {
  assert.match(achievement.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Achievement IDs must be URL-safe')
  assert.ok(!achievementIds.has(achievement.id), `Duplicate achievement ID: ${achievement.id}`)
  achievementIds.add(achievement.id)
  for (const field of ['title', 'category', 'issuer']) checkText(achievement[field], `Achievement ${achievement.id} ${field}`)
  if (achievement.projectId) assert.ok(ids.has(achievement.projectId), `${achievement.id} links to an unknown project`)
  if (achievement.paperTitle != null) checkText(achievement.paperTitle, `${achievement.id} paper title`)
  if (achievement.date != null) {
    assert.match(achievement.date, /^\d{4}-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/, `${achievement.id}: use YYYY-MM or YYYY-MM-DD`)
    checkText(achievement.dateLabel, `${achievement.id} date label`)
  }
  await checkAsset(achievement.certificateUrl, `${achievement.id} certificate`)
}
for (const project of projects) {
  const link = project.details.relatedLink
  if (!link) continue
  checkText(link.label, `${project.id} related link label`)
  if (link.href.startsWith('#')) {
    assert.ok(achievementIds.has(link.href.slice(1)), `${project.id} links to an unknown achievement`)
  } else {
    checkUrl(link.href, `${project.id} related link`)
  }
}
console.log(`Content check passed: ${projects.length} projects, ${skillGroups.length} skill groups, ${achievements.length} achievements, and optional links are valid.`)
