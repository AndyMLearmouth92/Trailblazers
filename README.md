# Trailblazers

<img width="1469" alt="image" src="https://user-images.githubusercontent.com/108182837/230394589-4314bd76-07e0-4305-9123-5e79df6c4833.png">

Trailblazers is a social media platform that allows climbers, hikers and walkers to share images and content from their adventures such as location, trail names and a caption. Our aim is to bring together adventurers and share knowledge and experience of great routes and locations. The site is responsive so works on desktop, tablet and mobile.

# Install

```bash
npm install
```

---

### Things to add
- Create a `.env` file in config folder and add the following as `key = value`
```bash
PORT = 2121
DB_STRING = `your database URI`
CLOUD_NAME = `your cloudinary cloud name`
API_KEY = `your cloudinary api key`
API_SECRET = `your cloudinary api secret`
```

## Running the application
```bash
npm run build-css
npm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Optimisations

For optimisations, I want to focus on: 
- expanding the search function so it searches trails and locations rather than just user names.
- changing the view from EJS to React. This will stop the page refreshing everytime a user clicks the like button.
- implementing functionality so that users can only click the like button on a post once. This could also act as an unlike feature.
- adding a dark mode.

## License

[MIT](https://choosealicense.com/licenses/mit/)
