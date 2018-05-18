# JobJungle
Our project is the job information platform that can inspire people with ideas about different jobs in the world. Users can use the search function or the recommend function to find the job they want to know. Then in job page they can see the skills related to the job, the google trend of the job and the data visualization for the job. In skill page they can see the details of one skill and the google trend. Users can also find their browser history in history page!

## Setup
1.First, make sure that you have npm installed on your system.

2.Run `npm install` through the terminal in the root of the repository.

3.Run `npm start` through the terminal. 

## Functions of the app
- Search function
- Recommand function
  - Sorting skill items by dragin
  - Scroll automatically
  - Recommanding jobs by the skill items selected by the user
- Loading job data from API.
- Loading picture data from API.
- Job data Visualization
  (visualization code: https://github.com/housenever/JobJungleVis_Test)
- embeding the google trend for jobs and skills
- Recording and showing the user's browser history with google login
- Responsive Web Design

## File Structure 
- Public: pure html and other data
- src: reactjs and css
  - components: the pure code for presentation without storing data
  - containers:
    - App.js: the beginning file and store data
    - ….js: map to each page view
  - data: common definations, fetch functions, and data
  - javascript: files include firebase to store users' data

## Tech/framework used
<b>Built with</b>
- [React](https://reactjs.org)
- [Semantic UI](https://react.semantic-ui.com/introduction)
- [StackBlitz](https://stackblitz.com/)
- [D3.js](https://d3js.org/)

## API Reference
- DATA AT WORK : http://api.dataatwork.org/v1/spec/#!/default
- Google trend: https://trends.google.com/trends
- Google search engine: https://www.google.se
- Image: https://unsplash.com/developers

