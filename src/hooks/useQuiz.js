// src/hooks/useQuiz.js
import { useState, useCallback } from 'react'
import { useApi } from './useApi'
import { useMutation } from './useMutation'

/**
 * Fetch quiz questions and handle answer submission.
 *
 * const {
 *   quiz, loading, error,          // quiz metadata + questions
 *   answers, setAnswer,            // answer state
 *   submit, submitting, result,    // submission
 * } = useQuiz(quizId)
 */
export function useQuiz(quizId) {
  const { data: quiz, loading, error, refetch } = useApi(
    quizId ? `/quizzes/${quizId}/` : null
  )

  const [answers, setAnswers] = useState({})
  const { mutate: submitAttempt, loading: submitting, error: submitError } = useMutation(
    `/quizzes/${quizId}/submit/`,
    'post'
  )

  const setAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const [result, setResult] = useState(null)

  const submit = useCallback(async () => {
    const payload = Object.entries(answers).map(([question_id, answer]) => ({
      question_id,
      answer,
    }))
    const data = await submitAttempt({ answers: payload })
    if (data) setResult(data)
    return data
  }, [answers, submitAttempt])

  const reset = useCallback(() => {
    setAnswers({})
    setResult(null)
  }, [])

  return {
    quiz,
    loading,
    error,
    refetch,
    answers,
    setAnswer,
    submit,
    submitting,
    submitError,
    result,
    reset,
  }
}
