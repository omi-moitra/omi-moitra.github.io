// Coordinates in the positioned Home page's padding box, unaffected by transforms.
export function getLayoutBox(element, page) {
  let top = 0
  let left = 0
  let node = element
  while (node && node !== page) {
    top += node.offsetTop
    left += node.offsetLeft
    node = node.offsetParent
    if (node && node !== page) {
      top += node.clientTop
      left += node.clientLeft
    }
  }
  return {
    top, left,
    bottom: top + element.offsetHeight,
    right: left + element.offsetWidth,
    height: element.offsetHeight,
  }
}

export function measureHomeStops(targets, page, isStacked, spineX) {
  return targets.flatMap((target, index) => {
    const box = getLayoutBox(target, page)
    const sectionId = target.dataset.homeSpineSection || String(index)
    if (isStacked) {
      return ['top', 'bottom'].map((edge) => ({
        id: `${sectionId}-${edge}`, sectionId, edge,
        y: box[edge], side: 'center', connectorLength: 0,
      }))
    }
    const side = box.right < spineX - 4 ? 'left'
      : box.left > spineX + 4 ? 'right' : 'center'
    return [{
      id: sectionId, sectionId, y: box.top + box.height / 2, side,
      connectorLength: side === 'left' ? spineX - box.right
        : side === 'right' ? box.left - spineX : 0,
    }]
  })
}

export function remapHomeStop(previousPoint, points) {
  const exact = points.findIndex((point) => point.id === previousPoint.id)
  if (exact >= 0) return exact
  // A desktop center becomes the same section's top edge; either edge becomes
  // that section's center on desktop, rather than reusing an unrelated index.
  return Math.max(0, points.findIndex((point) => point.sectionId === previousPoint.sectionId))
}
