export const contents: any = [
  {
    title: 'Home',
    path: '',
    url: '/',
  },
  {% for topic in doc.contents %}
  {
    title: '{$ topic.title $}',
    path: '{$ topic.url $}',
    url: '{$ topic.url $}',
    chapter: '{$ topic.chapter $}'
  },
  {% endfor %}
  {
    title: 'Not found',
    path: '**',
  },
];
