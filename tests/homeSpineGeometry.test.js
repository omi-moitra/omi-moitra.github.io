import test from 'node:test'
import assert from 'node:assert/strict'
import { getLayoutBox, measureHomeStops, remapHomeStop } from '../src/utils/homeSpineGeometry.js'

const page = { clientTop: 3, clientLeft: 3 }
function card(id, top, left, height, width, parent = page) {
  return {
    dataset: { homeSpineSection: id }, offsetTop: top, offsetLeft: left,
    offsetHeight: height, offsetWidth: width, offsetParent: parent,
    getBoundingClientRect() { throw new Error('Animated visual bounds must not be read') },
  }
}

test('layout coordinates include nested offsets and borders, excluding the page border', () => {
  const wrapper = { offsetTop: 100, offsetLeft: 20, clientTop: 2, clientLeft: 4, offsetParent: page }
  assert.deepEqual(getLayoutBox(card('hero', 30, 10, 200, 300, wrapper), page), {
    top: 132, left: 34, bottom: 332, right: 334, height: 200,
  })
})

test('mobile has paired edge stops while desktop retains centers and connectors', () => {
  const targets = [card('hero', 100, 100, 200, 600), card('skills', 500, 500, 400, 200)]
  const mobile = measureHomeStops(targets, page, true, 400)
  assert.deepEqual(mobile.map(({ id, y }) => [id, y]), [
    ['hero-top', 100], ['hero-bottom', 300], ['skills-top', 500], ['skills-bottom', 900],
  ])
  const desktop = measureHomeStops(targets, page, false, 400)
  assert.deepEqual(desktop.map(({ y, side, connectorLength }) => [y, side, connectorLength]), [
    [200, 'center', 0], [700, 'right', 100],
  ])
  assert.equal(remapHomeStop(mobile[3], desktop), 1)
  assert.equal(remapHomeStop(desktop[1], mobile), 2)
  assert.equal(remapHomeStop(mobile[3], mobile), 3)
  targets[1].offsetHeight = 600
  assert.equal(measureHomeStops(targets, page, true, 400)[3].y, 1100)
})
