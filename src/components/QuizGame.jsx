import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, AlertTriangle, HelpCircle } from 'lucide-react';
import { getCategoryConfig } from '../utils/chemistry';

const QUIZ_LENGTH = 10;

export default function QuizGame({ elements }) {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, finished
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null); // the answer selected by the user
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Generate a list of questions
  const generateQuiz = () => {
    const quizQuestions = [];
    const questionTypes = ['symbolToName', 'nameToSymbol', 'numberToName', 'categoryOfElement'];
    
    // Choose 10 random elements for the questions
    const shuffledElements = [...elements].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < QUIZ_LENGTH; i++) {
      const targetElement = shuffledElements[i];
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      let questionText = '';
      let correctAnswer = '';
      let options = [];

      if (type === 'symbolToName') {
        questionText = `Which element is represented by the chemical symbol "${targetElement.symbol}"?`;
        correctAnswer = targetElement.name;
        
        // Pick 3 random decoy names
        const decoys = elements
          .filter(el => el.number !== targetElement.number)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(el => el.name);
        options = [correctAnswer, ...decoys];
      } 
      else if (type === 'nameToSymbol') {
        questionText = `What is the chemical symbol for the element "${targetElement.name}"?`;
        correctAnswer = targetElement.symbol;
        
        const decoys = elements
          .filter(el => el.number !== targetElement.number)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(el => el.symbol);
        options = [correctAnswer, ...decoys];
      } 
      else if (type === 'numberToName') {
        questionText = `Which element has the atomic number ${targetElement.number}?`;
        correctAnswer = targetElement.name;
        
        const decoys = elements
          .filter(el => el.number !== targetElement.number)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(el => el.name);
        options = [correctAnswer, ...decoys];
      } 
      else if (type === 'categoryOfElement') {
        const catConfig = getCategoryConfig(targetElement.category);
        questionText = `Which chemical group does the element "${targetElement.name}" (${targetElement.symbol}) belong to?`;
        correctAnswer = catConfig.name;
        
        // Decoy categories
        const decoyCategories = [
          'Alkali Metal',
          'Alkaline Earth Metal',
          'Transition Metal',
          'Post-Transition Metal',
          'Metalloid',
          'Diatomic Nonmetal',
          'Noble Gas',
          'Lanthanide',
          'Actinide'
        ].filter(cat => cat !== correctAnswer);
        
        const decoys = decoyCategories
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        options = [correctAnswer, ...decoys];
      }

      // Shuffle options so the correct answer isn't always first
      options.sort(() => 0.5 - Math.random());

      quizQuestions.push({
        questionText,
        correctAnswer,
        options,
        element: targetElement
      });
    }

    setQuestions(quizQuestions);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAns(null);
    setIsAnswered(false);
    setGameState('playing');
  };

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    
    setSelectedAns(option);
    setIsAnswered(true);
    
    const isCorrect = option === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_LENGTH - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAns(null);
      setIsAnswered(false);
    } else {
      setGameState('finished');
    }
  };

  // Render Screens
  if (gameState === 'welcome') {
    return (
      <div className="glass-panel max-w-xl mx-auto p-8 rounded-3xl text-center space-y-6 bg-white">
        <div className="mx-auto w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
          <HelpCircle className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800">Chemistry Element Quiz</h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">
            Test your knowledge of the periodic table! Identify symbols, atomic numbers, element groups, and categories.
          </p>
        </div>
        <button
          onClick={generateQuiz}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white transition-all hover:scale-105 shadow-md shadow-slate-950/10 cursor-pointer"
        >
          Start Chemistry Quiz
        </button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const accuracy = (score / QUIZ_LENGTH) * 100;
    
    return (
      <div className="glass-panel max-w-xl mx-auto p-8 rounded-3xl text-center space-y-6 bg-white">
        <div className="mx-auto w-20 h-20 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center text-amber-500 shadow-md">
          <Award className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800">Quiz Completed!</h2>
          <p className="text-slate-500 font-semibold">Great effort! Here is your performance overview:</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="glass-card p-4 rounded-2xl bg-slate-50/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
            <span className="text-2xl font-black text-slate-800 mt-1">{score} / {QUIZ_LENGTH}</span>
          </div>
          <div className="glass-card p-4 rounded-2xl bg-slate-50/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
            <span className="text-2xl font-black text-emerald-600 mt-1">{accuracy}%</span>
          </div>
          <div className="glass-card p-4 rounded-2xl bg-slate-50/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Streak</span>
            <span className="text-2xl font-black text-blue-600 mt-1">{maxStreak}</span>
          </div>
        </div>

        {/* Restart Button */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => setGameState('welcome')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition cursor-pointer"
          >
            Go Back
          </button>
          <button
            onClick={generateQuiz}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white transition hover:scale-105 shadow-md shadow-slate-950/10 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const isCorrectAnswer = selectedAns === currentQuestion.correctAnswer;

  return (
    <div className="glass-panel max-w-xl mx-auto p-6 md:p-8 rounded-3xl bg-white space-y-6">
      
      {/* Progress & Streak Bar */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span>Question {currentIdx + 1} of {QUIZ_LENGTH}</span>
        {streak > 0 && (
          <span className="flex items-center gap-1 text-amber-600 animate-bounce">
            🔥 {streak} Streak
          </span>
        )}
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_LENGTH) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-800 leading-snug">
          {currentQuestion.questionText}
        </h3>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {currentQuestion.options.map((option, idx) => {
          let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
          let icon = null;

          if (isAnswered) {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAns;

            if (isCorrect) {
              btnStyle = 'border-emerald-300 bg-emerald-50/50 text-emerald-800 font-bold shadow-sm';
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (isSelected) {
              btnStyle = 'border-red-300 bg-red-50/50 text-red-800 font-bold shadow-sm';
              icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
            } else {
              btnStyle = 'border-slate-100 bg-slate-50/30 text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswerClick(option)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm font-semibold transition-all duration-200 cursor-pointer
                ${btnStyle}
                ${!isAnswered && 'hover:scale-[1.01] hover:border-slate-300'}
              `}
            >
              <span className="truncate pr-2">{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Post-answer Explanation Card */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed animate-fade-in
          ${isCorrectAnswer 
            ? 'bg-emerald-50/50 border-emerald-100 text-slate-700' 
            : 'bg-red-50/50 border-red-100 text-slate-700'
          }
        `}>
          {isCorrectAnswer ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <span className={`font-bold block ${isCorrectAnswer ? 'text-emerald-800' : 'text-red-800'}`}>
              {isCorrectAnswer ? 'Correct!' : 'Incorrect.'}
            </span>
            <p className="font-medium text-slate-600">
              The correct answer is <strong>{currentQuestion.correctAnswer}</strong>. 
              {currentQuestion.element.summary && ` ${currentQuestion.element.name} is a chemical element with symbol ${currentQuestion.element.symbol} and atomic number ${currentQuestion.element.number}.`}
            </p>
          </div>
        </div>
      )}

      {/* Action footer */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white transition hover:scale-105 cursor-pointer shadow-sm"
          >
            {currentIdx < QUIZ_LENGTH - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
