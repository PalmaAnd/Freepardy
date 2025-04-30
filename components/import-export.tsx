"use client"

import { useState } from "react"
import { Download, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGameData } from "@/hooks/use-game-data"

export default function ImportExport() {
  const { gameData, setGameData } = useGameData()
  const [jsonInput, setJsonInput] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleExport = () => {
    const dataStr = JSON.stringify(gameData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `jeopardy-game-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = () => {
    try {
      setError("")
      setSuccess("")

      const parsedData = JSON.parse(jsonInput)

      // Basic validation
      if (!parsedData.categories || !Array.isArray(parsedData.categories)) {
        throw new Error("Invalid format: Missing categories array")
      }

      // Validate each category has required fields
      parsedData.categories.forEach((category, index) => {
        if (!category.title) {
          throw new Error(`Category at index ${index} is missing a title`)
        }

        if (!category.questions || !Array.isArray(category.questions)) {
          throw new Error(`Category "${category.title}" is missing questions array`)
        }

        category.questions.forEach((question, qIndex) => {
          if (!question.question) {
            throw new Error(`Question ${qIndex + 1} in category "${category.title}" is missing question text`)
          }
          if (!question.answer) {
            throw new Error(`Question ${qIndex + 1} in category "${category.title}" is missing an answer`)
          }
          if (typeof question.value !== "number") {
            throw new Error(`Question ${qIndex + 1} in category "${category.title}" has an invalid value`)
          }
        })
      })

      setGameData(parsedData)
      setSuccess("Game data imported successfully!")
      setJsonInput("")
    } catch (err) {
      setError(`Import failed: ${err.message}`)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        setJsonInput(event.target.result)
      } catch (err) {
        setError(`File read error: ${err.message}`)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Export Game Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          Download your current game data as a JSON file that you can save or share.
        </p>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export to JSON
        </Button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-2">Import Game Data</h3>
        <p className="text-sm text-gray-500 mb-4">Import game data from a JSON file or paste JSON directly.</p>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Upload JSON File</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Or Paste JSON</label>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={10}
              placeholder='{"categories": [...]}'
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleImport} disabled={!jsonInput}>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
        </div>
      </div>
    </div>
  )
}
