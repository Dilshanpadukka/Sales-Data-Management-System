"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Key } from "lucide-react"

interface AdminCredentialsProps {
  currentUsername: string
  currentPassword: string
  updateCredentials: (username: string, password: string) => void
}

export function AdminCredentials({ currentUsername, currentPassword, updateCredentials }: AdminCredentialsProps) {
  const [username, setUsername] = useState(currentUsername)
  const [password, setPassword] = useState(currentPassword)
  const [confirmPassword, setConfirmPassword] = useState(currentPassword)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!username.trim()) {
      setError("Username cannot be empty")
      return
    }

    if (!password.trim()) {
      setError("Password cannot be empty")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    updateCredentials(username, password)
    setSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Credentials updated successfully</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-username">Username</Label>
          <Input
            id="admin-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter admin username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">New Password</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <Button type="submit" className="w-full gap-2">
        <Key className="h-4 w-4" />
        Update Credentials
      </Button>

      <div className="text-sm text-muted-foreground">
        <p>Default credentials:</p>
        <p>Username: admin</p>
        <p>Password: 1234admin</p>
      </div>
    </form>
  )
}

