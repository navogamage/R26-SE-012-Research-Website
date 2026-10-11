# Pepper Care Research Website

Pepper Care is the academic research portfolio for project **R26-SE-012**. It presents the team's work on an AI-assisted decision-support system for black pepper cultivation, including crop diagnosis, quality assessment, and market-price forecasting.

## Live website

[https://pepper-care.vercel.app/](https://pepper-care.vercel.app/)

## Research areas

- Black pepper leaf disease detection
- Pest detection and identification
- Black pepper berry disease detection
- Berry grading and short-term price forecasting

## Website content

The single-page website contains the sections required by the project website guidelines:

- Home and project introduction
- Research domain, literature survey, research gap, problem, objectives, methodology, and technologies
- Project milestones and assessments
- Research documents and download links
- Presentation slides
- Team members and supervisors
- Contact information and an email-template generator

## Contact email generator

The contact form uses client-side JavaScript to generate a complete email from the visitor's name, email address, subject, and message.

- **Open email app** creates a pre-addressed `mailto:` message for the project team.
- **Copy template** copies the generated recipients, subject, and message so they can be pasted into any email service.
- Form validation requires all fields and checks the visitor's email format.
- Contact-form information is processed only in the browser and is not stored by the website.

Because this is a static website, it does not send email through a server. Opening the generated message requires an email application or browser mail handler configured on the visitor's device. The copy option is available when no handler is configured.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel static hosting

No package installation, framework, database, or build process is required.

## Run locally

From the project directory, start a local static server:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in a browser. Keep the terminal running while testing and press `Ctrl+C` to stop the server.

Alternatively, open `index.html` directly or use the VS Code Live Server extension. A local server is recommended because it behaves more like the deployed website.

## Project structure

```text
.
|-- index.html          # Website content and semantic page structure
|-- styles.css          # Responsive layout and visual design
|-- script.js           # Navigation, animations, and contact generation
|-- assets/
|   |-- illustrations/  # Research-related SVG artwork
|   `-- images/         # Team photographs and optimized website images
|-- Website.pdf         # Project website requirements and guidelines
`-- README.md
```

## Basic validation

Check the JavaScript syntax after making changes:

```powershell
node --check script.js
```

When reviewing the site manually, verify the responsive navigation, document links, contact-field validation, generated email content, copy fallback, and layouts at desktop and mobile widths.

## Project team

| Researcher | Email | Phone |
|---|---|---|
| Navoda H.G.J | [IT22070012@my.sliit.lk](mailto:IT22070012@my.sliit.lk) | +94 71 484 3381 |
| Gunathunga P.C.I | [IT22087324@my.sliit.lk](mailto:IT22087324@my.sliit.lk) | +94 71 606 4250 |
| Premathilaka G.G.R.T | [IT22079268@my.sliit.lk](mailto:IT22079268@my.sliit.lk) | +94 71 349 8585 |
| Cassim T.S | [IT22217318@my.sliit.lk](mailto:IT22217318@my.sliit.lk) | +94 76 416 3540 |

