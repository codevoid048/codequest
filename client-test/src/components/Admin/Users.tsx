"use client"

import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, Filter, X, ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
const limit=10;
// EnhancedPagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function EnhancedPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<(number | string)[]>([]);
  
  useEffect(() => {
    // Create visible page numbers with ellipses when needed
    const calculateVisiblePages = () => {
      // For small number of pages, show all
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      
      // For many pages, use ellipsis
      const pages: (number | string)[] = [];
      
      // Always show first page
      pages.push(1);
      
      // Handle different cases based on current page position
      if (currentPage <= 3) {
        // Near start: show 1, 2, 3, 4, 5, ..., totalPages
        pages.push(2, 3, 4, 5, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: show 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push("ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: show 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push("ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
      }
      
      return pages;
    };
    
    setVisiblePages(calculateVisiblePages());
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center mt-8 ${className}`}
    >
      <div className="flex items-center space-x-1 p-1 bg-background/80 backdrop-blur-sm rounded-lg border border-border/40 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 rounded-md text-muted-foreground hover:text-primary disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </Button>
        
        <AnimatePresence mode="wait">
          {visiblePages.map((page, index) => 
            page === "ellipsis" ? (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-8">
                <MoreHorizontal size={16} className="text-muted-foreground" />
              </div>
            ) : (
              <motion.div
                key={`page-${page}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="icon"
                  onClick={() => onPageChange(page as number)}
                  className={`h-8 w-8 rounded-md font-medium ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {page}
                </Button>
              </motion.div>
            )
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 rounded-md text-muted-foreground hover:text-primary disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </motion.div>
  );
}

// Type definitions for UserDashboard
interface User {
  _id: string
  username: string
  collegeName: string
  branch: string
  name: string
  avatar: string
}

type FilterType = "collegeName" | "branch"
type SortDirection = "asc" | "desc"

// Animation variants
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  },
  item: {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  },
  filter: {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  },
  header: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  },
  search: {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.2, duration: 0.4 }
  },
  pagination: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, delay: 0.3 }
  }
}

export default function UserDashboard() {
  // State management
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10;
  const { user } = useAuth();
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, string[]>>({
    collegeName: [],
    branch: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [error, setError] = useState<string | null>(null)
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/admin/users?page=${currentPage}&limit=${itemsPerPage}`);
        console.log("current page data", res.data);
        if (res.data && Array.isArray(res.data.users)) {
          setUsers(res.data.users);
          setTotalPages(res.data.totalPages);
          setTotalUsers(res.data.totalUsers);
          setPaginationEnabled(res.data.totalPages > 1)
        } else if (res.data && typeof res.data === "object") {
          // Handle nested data structure
          const userData = res.data.users || res.data.data || []
          
          if (Array.isArray(userData)) {
            setUsers(userData)
            setTotalPages(res.data.totalPages || 1)
            setTotalUsers(res.data.totalUsers || userData.length)
            setPaginationEnabled((res.data.totalPages || 1) > 1)
          } else {
            throw new Error("Invalid data format received from API")
          }
        } else {
          throw new Error("Invalid data format received from API")
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError((error as Error).message)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  // Filter users based on search term
  const filteredUsersList = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.username.toLowerCase().includes(searchLower) ||
        user.collegeName.toLowerCase().includes(searchLower) ||
        user.branch.toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchTerm]);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have less pages than max to show, display all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at boundaries
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    applyFiltersAndSort()
  }, [searchTerm, activeFilters, sortBy, sortDirection, users])

  // Apply filters and sorting to users
  const applyFiltersAndSort = () => {
    if (!Array.isArray(users) || users.length === 0) {
      return
    }

    let result = [...users]

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      result = result.filter(
        (user) =>
          user.username?.toLowerCase().includes(search) ||
          user.collegeName?.toLowerCase().includes(search) ||
          user.branch?.toLowerCase().includes(search) ||
          user.name?.toLowerCase().includes(search)
      )
    }

    // Apply category filters
    Object.entries(activeFilters).forEach(([type, values]) => {
      if (values.length > 0) {
        result = result.filter((user) => 
          user[type as FilterType] && values.includes(user[type as FilterType])
        )
      }
    })

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy as keyof User]
        const bValue = b[sortBy as keyof User]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue)
        }
        return 0
      })
    }

    setUsers(result)
  }

  // Filter management
  const getUniqueValues = (key: FilterType) => {
    if (!Array.isArray(users) || users.length === 0) return []
    return Array.from(new Set(users.map((user) => user[key])))
  }

  const toggleFilter = (type: FilterType, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((v) => v !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }
      
      return newFilters
    })
  }

  const clearFilters = () => {
    setActiveFilters({ collegeName: [], branch: [] })
    setSearchTerm("")
  }

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(key)
      setSortDirection("asc")
    }
  }

  // UI helpers
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0)

  // Render section components
  const renderHeader = () => (
    <motion.div
      {...ANIMATIONS.header}
      className="mb-6 text-center"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        User Dashboard
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        View usernames, colleges, and branches of all registered users
      </p>
    </motion.div>
  )

  const renderSearchBar = () => (
    <motion.div
      {...ANIMATIONS.search}
      className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between"
    >
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search by username, college, or branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-input bg-muted focus:border-primary focus:ring-primary transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-3 w-full md:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={`transition-colors duration-300 ${
            showFilters ? "bg-primary/10 text-primary border-primary/30" : ""
          }`}
        >
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>
    </motion.div>
  )

  const renderFilterPanel = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          variants={ANIMATIONS.filter}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="mb-4 overflow-hidden"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <Filter size={16} className="mr-2" />
                Filter Users
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* College Filter */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <Users size={14} className="mr-1" />
                  College
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getUniqueValues("collegeName").map((college) => (
                    <Badge
                      key={college}
                      variant={activeFilters.collegeName.includes(college) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 ${
                        activeFilters.collegeName.includes(college)
                          ? "bg-primary hover:bg-primary/90"
                          : "hover:border-primary hover:text-primary"
                      }`}
                      onClick={() => toggleFilter("collegeName", college)}
                    >
                      {college}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Branch Filter */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <Users size={14} className="mr-1" />
                  Branch
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getUniqueValues("branch").map((branch) => (
                    <Badge
                      key={branch}
                      variant={activeFilters.branch.includes(branch) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 ${
                        activeFilters.branch.includes(branch)
                          ? "bg-secondary hover:bg-secondary/90"
                          : "hover:border-secondary hover:text-secondary-foreground"
                      }`}
                      onClick={() => toggleFilter("branch", branch)}
                    >
                      {branch}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <ArrowUpDown size={14} className="mr-1" />
                  Sort By
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["username", "collegeName", "branch"].map((field) => (
                    <Badge
                      key={field}
                      variant={sortBy === field ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 ${
                        sortBy === field
                          ? "bg-accent hover:bg-accent/90"
                          : "hover:border-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => handleSort(field)}
                    >
                      {field === "collegeName" ? "College" : field.charAt(0).toUpperCase() + field.slice(1)}
                      {sortBy === field && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const renderResultsHeader = () => (
    <div className="mb-2 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-foreground flex items-center">
        <Users size={20} className="mr-2 text-primary" />
        {filteredUsersList.length} {filteredUsersList.length === 1 ? "User" : "Users"} Found
      </h2>

      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters} 
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={16} className="mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  const renderTableHeader = () => (
    <div className="bg-muted backdrop-blur-sm rounded-lg p-2 pl-4 shadow-sm border border-border grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-medium text-foreground mb-2">
      <div className="flex items-center pl-10">Username</div>
      <div className="hidden md:block">College</div>
      <div className="hidden md:block">Branch</div>
    </div>
  )

  const renderLoadingState = () => (
    <div className="text-center py-8">
      <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">Loading Users</h3>
      <p className="text-muted-foreground">Please wait while we fetch the user data...</p>
    </div>
  )

  const renderEmptyState = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
      <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <Users size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">No Users Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        No users match your current search criteria. Try adjusting your filters or search term.
      </p>
      <Button variant="outline" className="mt-4" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </motion.div>
  )

  const renderUsersList = () => (
    <motion.div 
      id="users-list"
      variants={ANIMATIONS.container} 
      initial="hidden" 
      animate="visible" 
      className="space-y-2"
    >
      {filteredUsersList.map((user) => (
        <motion.div key={user._id} variants={ANIMATIONS.item}>
          <Card
            className="overflow-hidden py-0 hover:shadow-md transition-all duration-300 w-full cursor-pointer border-border hover:border-primary/30 group"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <CardContent className="flex flex-row items-center p-2 group-hover:bg-primary/5">
              <Avatar className="h-8 w-8 mr-3 ring-1 ring-primary/20">
                <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.username} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1">
                <p className="text-sm font-semibold text-foreground">@{user.username}</p>
                <Badge
                  variant="outline"
                  className="hidden md:inline-block bg-muted text-foreground text-xs py-0"
                >
                  {user.collegeName || "N/A"}
                </Badge>
                <Badge
                  variant="outline"
                  className="hidden md:inline-block bg-muted text-foreground text-xs py-0"
                >
                  {user.branch || "N/A"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  // Enhanced pagination component render
  const renderPagination = () => (
    totalPages > 1 && (
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 1 || isLoading}
          className="text-sm py-2 px-6 w-full sm:w-auto border-border hover:border-primary disabled:opacity-50 text-foreground"
        >
          <ChevronDown className="h-4 w-4 rotate-90 ml-2" />
         
        </Button>
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => typeof page === 'number' && goToPage(page)}
              className={`w-8 h-8 p-0 ${currentPage === page ? "bg-primary text-primary-foreground" : "border-border text-foreground"}`}
              disabled={page === "..." || isLoading}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage === totalPages || isLoading}
          className="text-sm py-2 px-6 w-full sm:w-auto border-border hover:border-primary disabled:opacity-50 text-foreground"
        >
        
          <ChevronUp className="h-4 w-4 rotate-90 mr-2" />
        </Button>
      </div>
    )
  )

  return (
    <div className="container mx-auto px-4 py-4">
      {renderHeader()}
      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">Error loading users: {error}</div>}
      {renderSearchBar()}
      {renderFilterPanel()}
      {renderResultsHeader()}
      {renderTableHeader()}

      {isLoading ? renderLoadingState() : 
        filteredUsersList.length === 0 ? renderEmptyState() : renderUsersList()}

      {renderPagination()}
    </div>
  )
}