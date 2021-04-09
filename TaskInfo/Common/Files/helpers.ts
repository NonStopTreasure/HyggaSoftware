const addMBString = (size: number): string =>
  (size / 1024 / 1024).toFixed(1) + "MB"

const addKBString = (size: number): string => (size / 1024).toFixed(1) + "KB"

const addBString = (size: number): string => size + "B"

const getFileSizeText = (size: number): string => {
  if (size / 1024 > 1024) {
    return addMBString(size)
  }

  if (size / 1024 > 1) {
    return addKBString(size)
  }

  return addBString(size)
}

export { getFileSizeText }
