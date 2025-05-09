# Multi Timer Manager

A React Native application that allows users to create, manage, and interact with multiple customizable timers. The app emphasizes clean UI/UX and minimal third-party dependencies while supporting grouped actions, progress visualization, and local data persistence.

---

## 🚀 Features Implemented

### 1. **Add Timer**
- Users can create new timers via a dedicated screen.
- Each timer has:
  - **Name** (e.g., "Workout Timer")
  - **Duration** (in seconds)
  - **Category** (e.g., Workout, Study, Break)
- All timers are stored locally using `AsyncStorage`.

---

### 2. **Timer List with Grouping**
- Timers are displayed grouped under their respective categories.
- Categories are **expandable/collapsible**.
- Each timer displays:
  - Name
  - Remaining time
  - Current status: `Running`, `Paused`, or `Completed`

---

### 3. **Timer Management**
Each timer provides the following controls:
- **Start** – Begins the countdown.
- **Pause** – Temporarily halts the countdown.
- **Reset** – Resets to the original duration.
- Auto-marked as `Completed` when the timer hits zero.

---

### 4. **Progress Visualization**
- A simple **progress bar** (or percentage indicator) shows how much time is left relative to the full duration.

---

### 5. **Bulk Actions (Per Category)**
Each category group has:
- **Start All** – Start all timers within the category.
- **Pause All** – Pause all timers within the category.
- **Reset All** – Reset all timers within the category.

---

### 6. **User Feedback on Completion**
- When a timer finishes:
  - An **on-screen modal** pops up.
  - Displays a **congratulatory message** with the timer’s name.

---

## 💾 Persistence
- All timer data is saved locally using `AsyncStorage`.
- Ensures data is retained across app sessions.

---

## ⚙️ Stack
- **React Native**
- **React Hooks**
- **AsyncStorage** for local persistence
- **Minimal third-party libraries** to keep performance optimal

---


---

## 📌 Summary
This project demonstrates practical implementation of:
- State management for concurrent timers
- Grouped UI interactions
- Async data storage and retrieval
- Visual progress feedback
- Clean and intuitive mobile interface

