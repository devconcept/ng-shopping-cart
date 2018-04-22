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
    chapter: '{$ topic.chapter $}',
    section: '{$ topic.section $}',
    menu: '{$ topic.menu $}',
    {% if topic.topics %}topics: {$ topic.topics | json $},{% endif %}
  },
  {% endfor %}
  {
    title: 'Not found',
    path: '**',
  },
];
