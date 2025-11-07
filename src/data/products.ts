import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  // Electronics
  {
    id: "1",
    title: "Wireless Earbuds - Sony WF-1000XM4",
    description: "Premium noise-cancelling wireless earbuds in excellent condition. Includes charging case, original box, and all accessories.",
    price: 89,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7a9f5?w=800&h=800&fit=crop",
    seller: "Sarah Johnson",
    datePosted: "2 days ago"
  },
  {
    id: "2",
    title: "Smartwatch - Apple Watch Series 7",
    description: "GPS + Cellular, 45mm, space gray aluminum case. Light scratches on screen, fully functional. Battery health 95%.",
    price: 249,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
    seller: "Michael Chen",
    datePosted: "1 week ago"
  },
  {
    id: "3",
    title: "Scientific Calculator - TI-84 Plus CE",
    description: "Essential for engineering and math courses. Color display, rechargeable battery. Includes USB cable and protective case.",
    price: 75,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop",
    seller: "David Park",
    datePosted: "3 days ago"
  },
  
  // Books & Notes
  {
    id: "4",
    title: "Calculus Textbook - Stewart 9th Edition",
    description: "Comprehensive calculus textbook with minimal highlighting. Perfect for MATH 101-102. All pages intact, no water damage.",
    price: 65,
    category: "Books & Notes",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop",
    seller: "Emily Rodriguez",
    datePosted: "5 days ago"
  },
  {
    id: "5",
    title: "Physics Notes Bundle - Complete Year",
    description: "Comprehensive handwritten notes for Physics 201-202. Includes all formulas, diagrams, and practice problems. High-quality PDF scan.",
    price: 25,
    category: "Books & Notes",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=800&fit=crop",
    seller: "James Wilson",
    datePosted: "1 day ago"
  },
  {
    id: "6",
    title: "Chemistry Lab Manual - 3rd Edition",
    description: "Required for CHEM 111 lab. Clean pages, no markings. Includes all experiment procedures and safety guidelines.",
    price: 30,
    category: "Books & Notes",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=800&fit=crop",
    seller: "Lisa Zhang",
    datePosted: "4 days ago"
  },
  {
    id: "7",
    title: "Computer Science Study Guide",
    description: "Data Structures & Algorithms notes with code examples. Covers all major topics: sorting, trees, graphs, dynamic programming.",
    price: 20,
    category: "Books & Notes",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=800&fit=crop",
    seller: "Alex Kumar",
    datePosted: "6 days ago"
  },
  
  // Stationery
  {
    id: "8",
    title: "Gel Pen Set - 24 Colors",
    description: "Vibrant gel pens perfect for note-taking and bullet journaling. Smooth ink flow, comfortable grip. All colors tested.",
    price: 15,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=800&fit=crop",
    seller: "Sophia Martinez",
    datePosted: "2 days ago"
  },
  {
    id: "9",
    title: "Whiteboard Markers - Pack of 12",
    description: "Dry-erase markers in assorted colors. Low odor, bold lines. Great for study sessions and group projects.",
    price: 10,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1606661540853-a6a58e27b310?w=800&h=800&fit=crop",
    seller: "Ryan Thompson",
    datePosted: "1 week ago"
  },
  {
    id: "10",
    title: "Notebook Bundle - 5 Pack",
    description: "College-ruled spiral notebooks, 100 sheets each. Durable covers, perforated pages. Never used, still in packaging.",
    price: 12,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=800&fit=crop",
    seller: "Hannah Lee",
    datePosted: "3 days ago"
  },
  {
    id: "11",
    title: "Mechanical Pencil Set - Professional",
    description: "Drafting quality mechanical pencils (0.5mm, 0.7mm). Includes lead refills and eraser. Perfect for engineering drawings.",
    price: 18,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&h=800&fit=crop",
    seller: "Daniel Kim",
    datePosted: "5 days ago"
  },
  {
    id: "12",
    title: "Sticky Notes Variety Pack",
    description: "Assorted sizes and colors. Includes tabs, flags, and standard squares. Strong adhesive, repositionable.",
    price: 8,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=800&fit=crop",
    seller: "Olivia Brown",
    datePosted: "4 days ago"
  }
];

export const categories = ["All", "Electronics", "Books & Notes", "Stationery"];
