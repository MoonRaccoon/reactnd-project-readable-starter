export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'

export function changeCategory (category) {
  return {
    type: CHANGE_CATEGORY,
    category
  }
}