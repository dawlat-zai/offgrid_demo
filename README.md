# Backend setup

1. Enter into backend directory.
   `cd backend`
2. Create .env file from .env.example
3. run `npm install`
4. run `npm start`

# Frontend setup

1. Enter into frontend directory.
   `cd frontend`
2. Create .env file from .env.example
3. run `npm install`
4. run `npm run dev`

# Points for generating dummy data

Following points should be used for generating dummy data to be displayed on charts

1. Solar Point
   `new Point("solar").floatField("power", 150)`
2. Battery Point
   `new Point("battery").floatField("voltage", 12.5)`
3. Load Point
   `new Point("load").floatField("current", 80)`

# TODO list

Following are the list of points for possible enhancement of the project.

1. Add a dropdown for filtering charts data. For example, filter by last 24 hours, last 7 days, last 30 days and so on.
2. Charts can also be filtered by date range.
3. Currently the charts are for only one solar panel, one battery and load for one location. In the future we can add data of more than one solar panel, battery or location. And then we can also filter out the charts for a specific solar panel, battery or location.
4. Design improvement
