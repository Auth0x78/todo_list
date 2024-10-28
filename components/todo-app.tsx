'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>To-Do List</CardTitle>
            <CardDescription>Manage your tasks efficiently</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <Label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {todo.text}
                </Label>
                <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {todos.length} item{todos.length !== 1 ? 's' : ''} total
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export function TodoAppComponent() {
  return <TodoApp />
}
