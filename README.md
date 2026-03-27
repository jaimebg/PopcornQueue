# PopcornQueue 🍿

PopcornQueue is a **React Native** mobile application that displays the most popular movies of the moment according to [The Movie Database (TMDb)](https://www.themoviedb.org/).

## 🖼️ Screenshots
![Home](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Home.png "Home") ![Details](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details.png "Details")![Details 2](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details2.png "Details 2")

## 📁 Project Structure

```
PopcornQueue/
├── constants/
│   └── theme.ts             # Colors, URLs, and layout constants
├── services/
│   └── tmdb.ts              # TMDB API client
├── hooks/
│   └── useMovies.ts         # Data fetching and pagination hook
├── components/
│   ├── MovieCard.tsx         # Memoized movie card component
│   └── ScreenHeader.tsx      # App header with logo
├── screens/
│   ├── HomeScreen.tsx        # Movie grid with infinite scroll
│   └── MovieDetailsScreen.tsx # Movie detail view
├── types/
│   ├── movie.ts             # Movie and API response types
│   └── navigation.ts        # Navigation stack param types
├── __tests__/
│   └── movies.test.ts       # Unit tests
├── assets/
│   ├── fonts/               # Geist-Bold, Geist-Regular
│   └── logo.png
├── App.tsx                  # Root component with navigation
└── index.ts                 # Entry point
```

## 🛠️ Technical Decisions

- **State Management:** React `useState` for local component state. For an application of this scale, it is a lightweight and efficient solution without the need for external libraries such as Redux.

- **Data Fetching:** Extracted into a custom `useMovies` hook that uses refs for mutable guards (`page`, `hasMore`, `loading`) and functional state updates to avoid stale closures. Supports infinite scroll pagination and pull-to-refresh.

- **API Layer:** Separated into `services/tmdb.ts` with proper HTTP error handling (`response.ok` check). Authentication via Bearer token stored in `.env` and loaded through `react-native-config`.

- **Styling:** React Native `StyleSheet` with centralized design tokens in `constants/theme.ts` for consistent colors, spacing, and typography across the app.

- **Navigation:** React Navigation native stack (`@react-navigation/native-stack`) with native headers. The MovieDetails screen uses the native back button and displays the movie title in the header bar.

- **Performance Optimizations:**
  - `React.memo` on `MovieCard` to prevent unnecessary re-renders
  - Memoized `renderItem` via `useCallback` so `React.memo` is effective
  - Stable `keyExtractor` defined at module level
  - `useMemo` for responsive layout calculations
  - All FlatList callbacks memoized (`renderFooter`, `renderEmpty`, `onEndReached`, `onRefresh`)
  - `contentInsetAdjustmentBehavior="automatic"` on scrollable views
  - `borderCurve: 'continuous'` for smooth rounded corners

- **Typography:** Custom Geist fonts (Bold and Regular) linked via `react-native.config.js`. Tabular number variants used for rating alignment.

## 🚀 Installation and Local Usage

1. **Clone the repository:**

    ```
    git clone https://github.com/jaimebg/PopcornQueue.git
    cd PopcornQueue
    ```

2. **Install the dependencies:**

    ```
    npm install
    ```

3. **Install CocoaPods (iOS):**

    ```
    cd ios
    pod install
    cd ..
    ```

4. **Set the environment variables:** You will need an API Key from [The Movie Database](https://www.themoviedb.org/). Create an `.env` file in the root of your project:

    ```
    TMDB_API_KEY="eyJhb..."
    ```

5. **Run the project:**

    ```
    npm run ios
    npm run android
    ```

6. **Run tests:**

    ```
    npm test
    ```
