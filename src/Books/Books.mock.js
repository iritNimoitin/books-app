const mockBooks = [
  { name: "The Midnight Library", author: "Matt Haig" },
  { name: "Project Hail Mary", author: "Andy Weir" },
  { name: "Klara and the Sun", author: "Kazuo Ishiguro" },
  { name: "The Silent Patient", author: "Alex Michaelides" },
  { name: "Lessons in Chemistry", author: "Bonnie Garmus" }
];

export const user = "postnikov";

export function getRandomMockBook() {
  const index = Math.floor(Math.random() * mockBooks.length);
  return {...mockBooks[index], user};
}
