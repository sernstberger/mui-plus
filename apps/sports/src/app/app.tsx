import { ContentGrid } from '@mui-plus/components';

export function App() {
  return (
    <div>
      <ContentGrid
        items={[
          {
            image: 'https://images.unsplash.com/photo-1637308109832-277975333a35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            title: 'Lizard',
            description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
          },
          {
            image: 'https://images.unsplash.com/photo-1637308109832-277975333a35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            title: 'Lizard',
            description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
          },
          {
            image: 'https://images.unsplash.com/photo-1637308109832-277975333a35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            title: 'Lizard',
            description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
          },
          {
            image: 'https://images.unsplash.com/photo-1637308109832-277975333a35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            title: 'Lizard',
            description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
          },
        ]}
        pageSize={5}
      // rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default App;
