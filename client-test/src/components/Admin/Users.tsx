"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, Filter, X, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAdminStore } from "@/context/AdminContext"

// Type definitions
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
  }
}

export default function UserDashboard() {
  const { users, fetchUsers } = useAdminStore()
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, string[]>>({
    collegeName: [],
    branch: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        await fetchUsers()
        setLoading(false)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch users")
        setLoading(false)
      }
    }
    
    loadUsers()
  }, [fetchUsers])

  // Update filteredUsers whenever users data changes
  useEffect(() => {
    setFilteredUsers(users || [])
  }, [users])

  const getUniqueValues = (key: FilterType) => {
    if (!Array.isArray(users) || users.length === 0) return []
    return Array.from(new Set(users.map((user) => user[key]).filter(Boolean)))
  }

  const toggleFilter = (type: FilterType, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((v) => v !== value)
      } else {
        throw new Error("Invalid data format received from API")
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

  // Apply filters and sorting to users
  const applyFiltersAndSort = () => {
    if (!Array.isArray(users) || users.length === 0) {
      setFilteredUsers([])
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

    setFilteredUsers(result)
    setCurrentPage(1)
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

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          User Dashboard
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          View usernames, colleges, and branches of all registered users
        </p>
      </motion.div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">Error loading users: {error}</div>}

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type="text"
            placeholder="Search by username, college, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-300 bg-muted focus:border-violet-500 focus:ring-violet-500 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            className={`transition-colors duration-300 ${showFilters ? "bg-violet-100 text-violet-700 border-violet-300" : ""}`}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mb-4 overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-700 flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filter Users
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* College Filter */}
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-2 flex items-center">
                    <Users size={14} className="mr-1" />
                    College
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getUniqueValues("collegeName").map((college) => (
                      <Badge
                        key={college}
                        variant={activeFilters.collegeName.includes(college) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 ${activeFilters.collegeName.includes(college)
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "hover:border-indigo-500 hover:text-indigo-600"
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
                  <h4 className="text-sm font-medium text-slate-500 mb-2 flex items-center">
                    <Users size={14} className="mr-1" />
                    Branch
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getUniqueValues("branch").map((branch) => (
                      <Badge
                        key={branch}
                        variant={activeFilters.branch.includes(branch) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 ${activeFilters.branch.includes(branch)
                            ? "bg-sky-500 hover:bg-sky-600"
                            : "hover:border-sky-500 hover:text-sky-600"
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
                  <h4 className="text-sm font-medium text-slate-500 mb-2 flex items-center">
                    <ArrowUpDown size={14} className="mr-1" />
                    Sort By
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["username", "collegeName", "branch"].map((field) => (
                      <Badge
                        key={field}
                        variant={sortBy === field ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 ${sortBy === field
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "hover:border-teal-500 hover:text-teal-600"
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

      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 flex items-center">
          <Users size={20} className="mr-2" />
          {filteredUsers.length} {filteredUsers.length === 1 ? "User" : "Users"} Found
        </h2>

        {Object.values(activeFilters).some((filters) => filters.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-500 hover:text-slate-700">
            <X size={16} className="mr-1" />
            Clear Filters
          </Button>
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
                      variant="outline"
                      className="hidden md:inline-block bg-primary-foreground text-foreground text-xs py-0"
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
        {filteredUsers.length} {filteredUsers.length === 1 ? "User" : "Users"} Found
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
      variants={ANIMATIONS.container} 
      initial="hidden" 
      animate="visible" 
      className="space-y-2"
    >
      {paginatedUsers.map((user) => (
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

  const renderPagination = () => (
    totalPages > 1 && (
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="border-border hover:bg-primary/5 hover:text-primary"
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={currentPage === page 
              ? "bg-primary text-primary-foreground" 
              : "border-border hover:bg-primary/5 hover:text-primary"
            }
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="border-border hover:bg-primary/5 hover:text-primary"
        >
          Next
        </Button>
      </div>
    )
  )
}