const GlitchingTypingText = (props) => {
  const { typingDuration = 3000, glitchProbability = 0.25, potentialGlitchInterval = 250 } = props
  const text = children
  const [renderedText, setRenderedText] = useState(text || '')

  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const randomizeTextCharacter = (textToAugment) => {
    const charToReplaceIndex = Math.floor(Math.random() * textToAugment.length)
    const randomChar = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
    const splitText = textToAugment.split('')
    splitText[charToReplaceIndex] = randomChar
    const newText = splitText.join('')
    return newText
  }

  const typingInterval = Math.floor(typingDuration / (text?.length || 1))
  useEffect(() => {
    const gID = setInterval(() => {
      if (Math.random() > 1 - glitchProbability) {
        setRenderedText(randomizeTextCharacter(text))
      } else {
        if (renderedText !== text) {
          setRenderedText(text)
        }
      }
    }, potentialGlitchInterval)

    return () => {
      clearInterval(gID)
      clearInterval(tID)
    }
  }, [])

  return (
    <RenderedText
      as={element}
      styling={styling}
      displayCaret={displayCaret}
      caretWidth={caretWidth}
      caretColor={caretColor}
      blinkingCaret={blinkingCaret}
      caretBlinkingSpeed={caretBlinkingSpeed}
    >
      {renderedText.slice(0, sliceIndex)}
    </RenderedText>
  )
}

export default GlitchingTypingText
