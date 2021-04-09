const maxTriesText = (maxTries: number): string => {
  if (!maxTries) {
    return "Нет ограничения на попытки"
  }

  return String(maxTries)
}

export { maxTriesText }
