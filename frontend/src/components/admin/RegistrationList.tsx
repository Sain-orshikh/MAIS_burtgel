'use client';

// Using mock data for development
import { mockUsers } from '@/data/mockUsers';
import { generateMockUsers } from '@/data/mockDataGenerator';
import { User } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import UserCard from './UserCard';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Pagination,
  Typography,
  Chip,
  Paper
} from '@mui/material';

// Uncomment when API is ready
// import { useRegistrations, useUpdateRegistrationStatus } from '@/hooks/api';

export default function RegistrationList() {
  // For development use mock data
  // Generate 500 mock users for testing pagination with large dataset
  const [registrations, setRegistrations] = useState<User[]>(() => generateMockUsers(500));
  const [isLoading, setIsLoading] = useState(false);
  const error = null;
  
  // Filtering and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 6 rows of 2 cards each

  // Uncomment when API is ready
  // const { data: registrations, isLoading, error } = useRegistrations();
  // const updateStatus = useUpdateRegistrationStatus();

  const handleStatusUpdate = (
    userId: string, 
    status: 'approved' | 'rejected', 
    reason?: string
  ) => {
    // For development, update the mock data
    setRegistrations(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return { ...user, status, updatedAt: new Date() };
      }
      return user;
    }));

    // Uncomment when API is ready
    // try {
    //   await updateStatus.mutateAsync({
    //     id: userId,
    //     status,
    //     reason: status === 'rejected' ? reason : undefined,
    //   });
    // } catch (error) {
    //   console.error('Failed to update status:', error);
    // }
  };

  // Filter and paginate users
  const filteredUsers = useMemo(() => {
    return registrations?.filter(user => {
      // Apply search filter
      const searchMatch = searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.school.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply status filter
      const statusMatch = statusFilter === 'all' || user.status === statusFilter;

      return searchMatch && statusMatch;
    }) || [];
  }, [registrations, searchTerm, statusFilter]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      all: registrations?.length || 0,
      pending: registrations?.filter(user => user.status === 'pending').length || 0,
      approved: registrations?.filter(user => user.status === 'approved').length || 0,
      rejected: registrations?.filter(user => user.status === 'rejected').length || 0
    };
  }, [registrations]);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredUsers, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-600 py-8'>
        An error occurred while fetching registrations
      </div>
    );
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Total Applications</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'medium' }}>{statusCounts.all}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f5f3a2' }}>
          <Typography variant="body2" color="text.secondary">Pending</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'medium', color: '#f57c00' }}>{statusCounts.pending}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Approved</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'medium', color: '#2e7d32' }}>{statusCounts.approved}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary">Rejected</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'medium', color: '#d32f2f' }}>{statusCounts.rejected}</Typography>
        </Paper>
      </Box>
      
      {/* Filter Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3, gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search applications..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: '250px', flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: '150px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={handleStatusFilterChange}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results summary and filters */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'application' : 'applications'} found
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {searchTerm && (
            <Chip 
              label={`Search: "${searchTerm}"`} 
              onDelete={() => setSearchTerm('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          
          {statusFilter !== 'all' && (
            <Chip 
              label={`Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`} 
              onDelete={() => setStatusFilter('all')}
              size="small"
              color={
                statusFilter === 'approved' ? 'success' : 
                statusFilter === 'rejected' ? 'error' : 'warning'
              }
            />
          )}
        </Box>
      </Box>
      
      {/* User cards - Two cards per row */}
      <Box sx={{ mb: 3 }}>
        {currentItems.length > 0 ? (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
            gap: 3 
          }}>
            {currentItems.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onStatusChange={handleStatusUpdate}
              />
            ))}
          </Box>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No applications found matching your filters
            </Typography>
          </Paper>
        )}
      </Box>
      
      {/* Pagination with page information */}
      {filteredUsers.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)} • 
              Showing {Math.min(filteredUsers.length, 1 + (currentPage - 1) * itemsPerPage)}-
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} applications
            </Typography>
          </Box>
          <Pagination 
            count={Math.ceil(filteredUsers.length / itemsPerPage)} 
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}
