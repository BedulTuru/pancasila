/**
 * Formats chemical formulas in text by replacing numbers following elements with unicode subscripts.
 * Example: "H2O" -> "H₂O", "C6H12O6" -> "C₆H₁₂O₆"
 */
export const formatScientific = (text) => {
  if (!text) return text;
  
  // Unicode subscripts for 0-9
  const subscripts = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };

  // Regex to find numbers that should be subscripted in chemical formulas
  // Looks for numbers immediately following a capital letter or lowercase element letters
  // This is a heuristic but works well for most titles
  return text.replace(/([A-Z][a-z]?|[\)])(\d+)/g, (match, element, numbers) => {
    const subbed = numbers.split('').map(n => subscripts[n] || n).join('');
    return element + subbed;
  });
};
