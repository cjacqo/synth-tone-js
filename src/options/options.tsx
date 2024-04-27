// Subdivision
export enum SubdivisionOptions {
  OneM = "1m",
  OneN = "1n",
  OneNDot = "1n.",
  TwoN = "2n",
  TwoNDot = "2n.",
  TwoT = "2t",
  FourN = "4n",
  FourNDot = "4n.",
  FourT = "4t",
  EightN = "8n",
  EightNDot = "8n.",
  EightT = "8t",
  SixteenN = "16n",
  SixteenNDot = "16n.",
  SixteenT = "16t",
  ThirtyTwoN = "32n",
  ThirtyTwoNDot = "32n.",
  ThirtyTwoT = "32t",
  SixtyFourN = "64n",
  SixtyFourNDot = "64n.",
  SixtyFourT = "64t",
  OneTwentyEightN = "128n",
  OneTwentyEightNDot = "128n.",
  OneTwentyEightT = "128t",
  TwoFiftySixN = "256n",
  TwoFiftySixNDot = "256n.",
  TwoFiftySixT = "256t",
  Zero = "0"
}

// Frequency
export enum FrequencyTypes {
  Subdivision = 'subdivision',
  Note = 'note',
  Number = 'number'
}

// Curves
export type BasicEnvelopeCurve = 'linear' | 'exponential'
export type EnvelopeCurve = BasicEnvelopeCurve | 'sine' | 'cosine' | 'bounce' | 'ripple' | 'step'