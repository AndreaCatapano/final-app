# Plant Management System 🌱

Progetto finale Full Stack per il corso Boolean - Sistema di gestione database piante con trattamenti specifici e classificazione tramite tag.

## 📋 Descrizione del Progetto

**Plant Management System** è un'applicazione Full Stack che permette di gestire un database completo di piante, con la possibilità di:
- Catalogare e organizzare piante con caratteristiche specifiche
- Associare trattamenti personalizzati a ogni pianta
- Classificare le piante tramite un sistema di tag
- Gestire relazioni complesse tra entità (Many-to-Many, One-to-Many)

## 🏗️ Architettura

### Backend - Applicazione Monolitica
- **Framework**: Spring Boot (Java)
- **Template Engine**: Thymeleaf
- **Database**: MySQL
- **Security**: Spring Security
- **Pattern**: MVC con CRUD completo
- **Architettura**: Entity → Service → Controller

**Caratteristiche Backend:**
- Gestione completa CRUD per piante e caratteristiche
- API REST per il frontend React
- Pagina dettaglio piante con gestione trattamenti
- Sistema di autenticazione e autorizzazione
- Relazioni database Many-to-Many e One-to-Many

### Frontend - SPA React
- **Framework**: React
- **Routing**: React Router DOM  
- **HTTP Client**: Axios
- **Modalità**: Read-only (consumo API)

**Caratteristiche Frontend:**
- Interfaccia utente moderna e responsive
- Visualizzazione dati tramite API REST
- Navigazione fluida tra le sezioni
- Integrazione completa con il backend via Axios

## 🛠️ Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| **Backend** | Java, Spring Boot, Spring Security, Thymeleaf |
| **Frontend** | React, React Router DOM, Axios |
| **Database** | MySQL |
| **API Testing** | Postman |
| **Architecture** | Monolithic Backend + SPA Frontend |

## 🚀 Setup e Installazione

### Prerequisiti
- Java 17+
- Node.js 16+
- MySQL
- Maven

### 1. Setup Database
```sql
CREATE DATABASE plant_management;
```

### 2. Backend Setup
```bash
# Clona il repository
git clone [repository-url]
cd plant-management-backend

# Configura application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/plant_management
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Avvia il server backend
mvn spring-boot:run
```
**Backend disponibile su**: `http://localhost:8080`

### 3. Frontend Setup
```bash
cd plant-management-frontend

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```
**Frontend disponibile su**: `http://localhost:3000`

## 🌐 Porte di Default

* **Backend**: Spring Boot (Java) - Porta 8080
* **Frontend**: React - Porta 3000
* **Database**: MySQL - Porta 3306

## 📊 Modello Dati

### Entità Principali
- **Plants** (Piante)
- **Treatments** (Trattamenti)  
- **Tags** (Etichette di classificazione)

### Relazioni
- **Plants ↔ Treatments**: One-to-Many (Una pianta può avere più trattamenti)
- **Plants ↔ Tags**: Many-to-Many (Una pianta può avere più tag, un tag può essere associato a più piante)

## 🔧 API Endpoints

Le API sono state sviluppate seguendo i principi REST e testate con Postman:

```
GET    /api/plants          # Lista tutte le piante
GET    /api/plants/{id}     # Dettaglio pianta specifica
POST   /api/plants          # Crea nuova pianta
PUT    /api/plants/{id}     # Aggiorna pianta
DELETE /api/plants/{id}     # Elimina pianta

GET    /api/treatments      # Lista trattamenti
POST   /api/treatments      # Crea trattamento
PUT    /api/treatments/{id} # Aggiorna trattamento
DELETE /api/treatments/{id} # Elimina trattamento

GET    /api/tags            # Lista tag
POST   /api/tags            # Crea tag
```

## ✨ Funzionalità

### Backend (Thymeleaf)
- ✅ CRUD completo per piante
- ✅ Gestione trattamenti dalla pagina dettaglio pianta
- ✅ Sistema di autenticazione
- ✅ Gestione tag e classificazione
- ✅ API REST per frontend

### Frontend (React)
- ✅ Visualizzazione elenco piante
- ✅ Dettaglio pianta con trattamenti associati
- ✅ Filtri per tag e categorie
- ✅ Interfaccia responsive
- ✅ Navigazione SPA

## 🧪 Testing

Le API sono state completamente testate utilizzando **Postman** per verificare:
- Correttezza dei dati restituiti
- Gestione degli errori
- Autenticazione e autorizzazione
- Relazioni tra entità

## 📝 Note di Sviluppo

- Il frontend React è configurato in modalità **read-only** per la visualizzazione dati
- L'applicazione backend è completamente **self-contained** con Thymeleaf per la gestione amministrativa
- Le API sono progettate per essere facilmente estendibili
- Il sistema di security permette differenti livelli di accesso

## 🎯 Obiettivi Raggiunti

- [x] Implementazione Full Stack completa
- [x] Database relazionale con MySQL
- [x] Backend Spring Boot con architettura MVC
- [x] Frontend React con consumo API
- [x] Sistema di autenticazione e sicurezza
- [x] CRUD operations complete
- [x] Relazioni complesse Many-to-Many e One-to-Many
- [x] API REST documentate e testate

---

**Progetto sviluppato per**: Corso Full Stack Developer - Boolean  
**Tecnologie**: Java Spring Boot, React, MySQL  
**Pattern**: MVC, REST API, SPA
