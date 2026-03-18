# 📚 Digital Library Viewer

A lightweight digital library web application for organizing and browsing historic building data. This project demonstrates how structured datasets (images + metadata) can be displayed, searched, and explored through a simple user interface.

---

## 🚀 Features

- 📂 Displays a collection of historic buildings
- 🔍 Search functionality (by name or location)
- 🖼️ Image previews for each asset
- 📄 Click to view detailed information
- 📊 Structured dataset using JSON

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- JSON (for data storage)

---

## 📁 Project Structure

digital-library/
│── index.html # Main webpage
│── style.css # Styling
│── script.js # Functionality (search, display)
│── data.json # Dataset (building info)

---

## ▶️ How to Run

### Option 1 (Recommended)
Use Live Server in Visual Studio Code:
1. Install the **Live Server** extension
2. Right-click `index.html`
3. Click **"Open with Live Server"**

---

### Option 2
Open `index.html` directly in your browser

⚠️ Note: Search/data may not work due to browser restrictions when using `fetch()` without a local server.

---

## 📊 Data Format Example

```json
{
  "name": "Old Cabin",
  "location": "Louisiana",
  "year": 1890,
  "description": "Historic wooden cabin",
  "image": "image-url"
}
