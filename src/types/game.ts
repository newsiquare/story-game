export interface Option {
  id: string;
  text: string;
  voiceUrl?: string; // URL for audio playback of this option
}

export interface Question {
  id: string;
  text: string;
  voiceUrl?: string; // URL for audio reading the question
  options: Option[];
  correctOptionId: string;
  feedbackCorrect: string; // Message when user gets it right
  feedbackIncorrect: string; // Message when user gets it wrong
}

export interface Scene {
  id: string;
  storyText: string;
  voiceUrl?: string; // URL for audio reading the story part
  imageUrl: string; 
  question?: Question; // A scene might trigger a question at the end
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  scenes: Scene[];
}
