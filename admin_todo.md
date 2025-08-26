# 제주탁송 Admin 페이지 추가 구현 TODO

## 📋 개요
현재 견적 관리 기능은 완료되었으나, admin_api.md에 명세된 관리자 계정 관리 기능과 추가 편의 기능들이 미구현 상태입니다.

## 🎯 구현 우선순위

---

## 📌 **우선순위 1: 핵심 기능**

### 1. 관리자 계정 관리 시스템 구현

#### 1.1 새로운 컴포넌트 생성
```typescript
// 📁 src/components/admin/AdminManagement.tsx - 관리자 관리 메인 컴포넌트
interface AdminManagementProps {
  className?: string;
}

// 기능:
// - 관리자 목록 테이블 표시
// - 관리자 추가/수정/삭제 모달
// - 역할별 필터링 (최고관리자/관리자)
// - 검색 기능 (이름, 로그인ID로 검색)
```

```typescript
// 📁 src/components/admin/AdminForm.tsx - 관리자 추가/수정 폼
interface AdminFormProps {
  mode: 'create' | 'edit';
  adminData?: AdminUser;
  onSubmit: (data: AdminFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

// 폼 필드:
// - 로그인 ID (생성시에만 수정 가능)
// - 이름
// - 전화번호  
// - 비밀번호 (Base64 인코딩)
// - 역할 (최고관리자/관리자)
// - 유효성 검사 포함
```

```typescript
// 📁 src/components/admin/AdminTable.tsx - 관리자 목록 테이블
interface AdminTableProps {
  admins: AdminUser[];
  currentUserId: number;
  onEdit: (admin: AdminUser) => void;
  onDelete: (adminId: number) => void;
  isLoading?: boolean;
}

// 기능:
// - 페이지네이션
// - 정렬 (이름, 생성일, 역할별)
// - 본인 삭제 방지
// - 역할 뱃지 표시
```

#### 1.2 API 훅 구현
```typescript
// 📁 src/hooks/useAdminManagement.ts
export const useAdminManagement = () => {
  // React Query 기반 구현
  
  // 관리자 목록 조회
  const useAdmins = () => useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const response = await fetch('/api/proxy/admin', {
        headers: { 'X-Admin-Id': user?.id.toString() || '' }
      });
      return response.json();
    },
    enabled: isSuperAdmin,
  });

  // 관리자 생성
  const createAdminMutation = useMutation({
    mutationFn: async (data: CreateAdminRequest) => {
      return fetch('/api/proxy/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': user?.id.toString() || '',
        },
        body: JSON.stringify({
          ...data,
          password: btoa(data.password) // Base64 인코딩
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });

  // 관리자 수정
  const updateAdminMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: UpdateAdminRequest }) => {
      return fetch(`/api/proxy/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': user?.id.toString() || '',
        },
        body: JSON.stringify({
          ...data,
          password: data.password ? btoa(data.password) : undefined
        }),
      });
    },
  });

  // 관리자 삭제
  const deleteAdminMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetch(`/api/proxy/admin/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Id': user?.id.toString() || '' },
      });
    },
  });

  return {
    // 쿼리
    admins: useAdmins(),
    
    // 뮤테이션
    createAdmin: createAdminMutation.mutateAsync,
    updateAdmin: updateAdminMutation.mutateAsync,
    deleteAdmin: deleteAdminMutation.mutateAsync,
    
    // 상태
    isCreating: createAdminMutation.isPending,
    isUpdating: updateAdminMutation.isPending,
    isDeleting: deleteAdminMutation.isPending,
  };
};
```

#### 1.3 타입 정의 확장
```typescript
// 📁 src/types/admin.ts에 추가
export interface CreateAdminRequest {
  loginId: string;
  password: string;
  role: AdminRole;
  phone: string;
  name: string;
}

export interface UpdateAdminRequest {
  loginId?: string;
  password?: string; // 선택적 - 변경 시에만
  role?: AdminRole;
  phone?: string;
  name?: string;
}

export interface AdminFormData {
  loginId: string;
  password: string;
  confirmPassword: string;
  role: AdminRole;
  phone: string;
  name: string;
}
```

#### 1.4 페이지 라우팅 추가
```typescript
// 📁 src/app/admin/management/page.tsx - 관리자 관리 페이지
'use client';

export default function AdminManagementPage() {
  const { isSuperAdmin } = useAdminAuth();
  const router = useRouter();

  // 권한 체크
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push('/admin');
    }
  }, [isSuperAdmin, router]);

  if (!isSuperAdmin) {
    return <div>권한이 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <AdminManagement />
    </div>
  );
}
```

#### 1.5 네비게이션 메뉴 추가
```typescript
// 📁 src/app/admin/page.tsx 수정 - 최고관리자용 메뉴 추가
const adminMenuItems = [
  {
    title: '견적 관리',
    description: '탁송 견적 조회 및 상태 관리',
    icon: <FileText className="h-6 w-6" />,
    href: '/admin', // 현재 페이지
    roles: [AdminRole.SUPER_ADMIN, AdminRole.ADMIN]
  },
  {
    title: '관리자 관리',
    description: '관리자 계정 생성 및 관리',
    icon: <Users className="h-6 w-6" />,
    href: '/admin/management',
    roles: [AdminRole.SUPER_ADMIN] // 최고관리자만
  }
];

// 현재 사용자 역할에 따라 메뉴 필터링
const visibleMenuItems = adminMenuItems.filter(item => 
  item.roles.includes(user?.role as AdminRole)
);
```

---

### 2. 견적 전체 수정 기능 구현

#### 2.1 견적 수정 폼 컴포넌트
```typescript
// 📁 src/components/admin/EstimateEditForm.tsx
interface EstimateEditFormProps {
  estimate: AdminEstimate;
  onSave: (data: AdminEstimateUpdateRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

// 포함 기능:
// - 모든 견적 필드 수정 가능
// - 차량 검색 기능 (useVehicleSearch 훅 활용)
// - 주소 검색 기능 (기존 EstimateBottomSheet와 동일)
// - 날짜 선택기
// - 실시간 유효성 검사
// - 변경사항 하이라이트
```

#### 2.2 견적 상세 페이지 수정 모드 추가
```typescript
// 📁 src/app/admin/estimates/[id]/page.tsx 수정
export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  const [editMode, setEditMode] = useState(false);
  
  return (
    <div>
      {editMode ? (
        <EstimateEditForm 
          estimate={estimate}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <EstimateDetail 
          estimate={estimate}
          onEdit={() => setEditMode(true)}
        />
      )}
    </div>
  );
}
```

#### 2.3 API 확장
```typescript
// 📁 src/hooks/useAdminEstimates.ts에 추가
const updateEstimateFullMutation = useMutation({
  mutationFn: async ({ 
    estimateId, 
    data 
  }: { 
    estimateId: number; 
    data: AdminEstimateUpdateRequest 
  }) => {
    const response = await fetch(`${ADMIN_API_BASE}/estimates/${estimateId}`, {
      method: 'POST', // 서버 API가 POST를 사용
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Id': user?.id.toString() || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '견적 수정에 실패했습니다.');
    }

    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-estimates'] });
  },
});
```

---

### 3. 권한별 UI/기능 제어 강화

#### 3.1 권한 기반 라우팅 가드
```typescript
// 📁 src/components/admin/AdminGuard.tsx
interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: AdminRole;
  fallback?: React.ReactNode;
}

export const AdminGuard = ({ 
  children, 
  requiredRole, 
  fallback 
}: AdminGuardProps) => {
  const { user, isAuthenticated } = useAdminAuth();

  if (!isAuthenticated || !user) {
    return fallback || <div>로그인이 필요합니다.</div>;
  }

  if (requiredRole !== undefined && user.role > requiredRole) {
    return fallback || <div>권한이 부족합니다.</div>;
  }

  return <>{children}</>;
};
```

#### 3.2 조건부 UI 컴포넌트
```typescript
// 📁 src/components/admin/ConditionalRender.tsx
interface ConditionalRenderProps {
  children: React.ReactNode;
  condition: 'authenticated' | 'superAdmin' | 'admin';
  fallback?: React.ReactNode;
}

export const ConditionalRender = ({ 
  children, 
  condition, 
  fallback 
}: ConditionalRenderProps) => {
  const { isAuthenticated, user } = useAdminAuth();

  const shouldRender = useMemo(() => {
    switch (condition) {
      case 'authenticated':
        return isAuthenticated;
      case 'superAdmin':
        return user?.role === AdminRole.SUPER_ADMIN;
      case 'admin':
        return user?.role === AdminRole.ADMIN || user?.role === AdminRole.SUPER_ADMIN;
      default:
        return false;
    }
  }, [condition, isAuthenticated, user]);

  return shouldRender ? <>{children}</> : (fallback || null);
};
```

---

## 📌 **우선순위 2: 편의성 향상**

### 4. 차량 검색 API 연동

#### 4.1 차량 검색 훅 구현
```typescript
// 📁 src/hooks/useVehicleSearch.ts
export const useVehicleSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VehicleResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 차량 전체 목록 조회
  const vehicleListQuery = useQuery({
    queryKey: ['vehicle-list-total'],
    queryFn: async () => {
      const response = await fetch('/api/proxy/car-list/total');
      return response.json();
    },
  });

  // 차량 검색 함수
  const searchVehicles = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/proxy/car-list/search?text=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Vehicle search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // 디바운싱된 검색
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchVehicles(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchVehicles]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    vehicleCategories: vehicleListQuery.data,
    isLoadingCategories: vehicleListQuery.isLoading,
  };
};
```

#### 4.2 차량 선택 컴포넌트
```typescript
// 📁 src/components/admin/VehicleSelector.tsx
interface VehicleSelectorProps {
  value?: string;
  onChange: (vehicle: string) => void;
  placeholder?: string;
  error?: string;
}

export const VehicleSelector = ({ 
  value, 
  onChange, 
  placeholder, 
  error 
}: VehicleSelectorProps) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    vehicleCategories
  } = useVehicleSearch();

  return (
    <div className="relative">
      <EnhancedInput
        type="text"
        placeholder={placeholder || "차량을 검색하세요 (예: 아반떼, BMW)"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        error={error}
        icon={<Search className="h-4 w-4" />}
      />
      
      {/* 검색 결과 드롭다운 */}
      {searchQuery && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
          {isSearching ? (
            <div className="p-2 text-center">검색 중...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((vehicle, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(vehicle.name);
                  setSearchQuery(vehicle.name);
                }}
                className="w-full p-2 text-left hover:bg-gray-100"
              >
                {vehicle.name}
              </button>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

---

### 5. 통계 대시보드 강화

#### 5.1 통계 API 훅
```typescript
// 📁 src/hooks/useAdminStats.ts
interface StatsParams {
  startDate?: string;
  endDate?: string;
  companyKey?: string;
}

export const useAdminStats = (params: StatsParams = {}) => {
  // 전체 통계
  const overallStatsQuery = useQuery({
    queryKey: ['admin-stats', 'overall', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.startDate) searchParams.set('startDate', params.startDate);
      if (params.endDate) searchParams.set('endDate', params.endDate);
      if (params.companyKey) searchParams.set('companyKey', params.companyKey);

      const response = await fetch(`/api/proxy/admin/stats?${searchParams.toString()}`, {
        headers: { 'X-Admin-Id': user?.id.toString() || '' }
      });
      return response.json();
    },
  });

  // 기간별 통계
  const periodStatsQuery = useQuery({
    queryKey: ['admin-stats', 'period', params],
    queryFn: async () => {
      const response = await fetch('/api/proxy/admin/stats/period', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': user?.id.toString() || '',
        },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    enabled: !!(params.startDate && params.endDate),
  });

  return {
    overallStats: overallStatsQuery.data,
    periodStats: periodStatsQuery.data,
    isLoadingOverall: overallStatsQuery.isLoading,
    isLoadingPeriod: periodStatsQuery.isLoading,
  };
};
```

#### 5.2 통계 대시보드 컴포넌트
```typescript
// 📁 src/components/admin/StatsDashboard.tsx
export const StatsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const { overallStats, periodStats, isLoadingOverall } = useAdminStats(dateRange);

  return (
    <div className="space-y-6">
      {/* 기간 선택 */}
      <Card>
        <CardHeader>
          <CardTitle>통계 기간 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div>
              <label>시작일</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="block w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label>종료일</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="block w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="총 견적 수"
          value={overallStats?.totalEstimates || 0}
          icon={<FileText className="h-6 w-6" />}
          color="blue"
        />
        <StatsCard
          title="총 매출"
          value={`${(overallStats?.totalRevenue || 0).toLocaleString()}원`}
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />
        <StatsCard
          title="완료율"
          value={`${overallStats?.completionRate || 0}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          color="purple"
        />
        <StatsCard
          title="평균 견적가"
          value={`${(overallStats?.averageEstimate || 0).toLocaleString()}원`}
          icon={<Calculator className="h-6 w-6" />}
          color="orange"
        />
      </div>

      {/* 차트 섹션 */}
      {periodStats && (
        <Card>
          <CardHeader>
            <CardTitle>기간별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 여기에 차트 라이브러리 (recharts 등) 활용 */}
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              차트 영역 (recharts 등으로 구현 예정)
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
```

---

### 6. 데이터 내보내기 기능

#### 6.1 내보내기 훅
```typescript
// 📁 src/hooks/useDataExport.ts
export const useDataExport = () => {
  const exportMutation = useMutation({
    mutationFn: async (params: {
      type: 'excel' | 'csv';
      dateRange?: { startDate: string; endDate: string };
      filters?: any;
    }) => {
      const response = await fetch('/api/proxy/admin/export/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': user?.id.toString() || '',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('내보내기에 실패했습니다.');
      }

      // 파일 다운로드
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `견적목록_${new Date().toISOString().split('T')[0]}.${params.type}`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    exportData: exportMutation.mutateAsync,
    isExporting: exportMutation.isPending,
    exportError: exportMutation.error,
  };
};
```

#### 6.2 내보내기 버튼 컴포넌트
```typescript
// 📁 src/components/admin/ExportButton.tsx
export const ExportButton = () => {
  const { exportData, isExporting } = useDataExport();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        내보내기
      </Button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">데이터 내보내기</h3>
            
            {/* 내보내기 옵션 */}
            <div className="space-y-4">
              <div>
                <label>파일 형식</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="csv">CSV (.csv)</option>
                </select>
              </div>
              
              {/* 기간 선택 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>시작일</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label>종료일</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                취소
              </Button>
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? '내보내는 중...' : '내보내기'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
```

---

## 📌 **우선순위 3: 확장성**

### 7. 회사 관리 시스템

#### 7.1 회사 관리 타입 정의
```typescript
// 📁 src/types/company.ts
export interface Company {
  key: string;          // 'JEJULOGIS', 'SCLOGIS' 등
  name: string;         // '제주탁송', 'SC로지스' 등
  phone: string;
  address: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyRequest {
  key: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
}
```

#### 7.2 회사 관리 컴포넌트
```typescript
// 📁 src/components/admin/CompanyManagement.tsx
export const CompanyManagement = () => {
  const { companies, createCompany, updateCompany, deleteCompany } = useCompanyManagement();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">협력업체 관리</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          업체 추가
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>업체 코드</TableHead>
                <TableHead>업체명</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies?.map((company) => (
                <TableRow key={company.key}>
                  <TableCell className="font-mono">{company.key}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell>
                    <Badge variant={company.isActive ? 'default' : 'secondary'}>
                      {company.isActive ? '활성' : '비활성'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(company)}
                      >
                        수정
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(company.key)}
                      >
                        삭제
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
```

---

### 8. 파일 관리 시스템

#### 8.1 파일 업로드 컴포넌트
```typescript
// 📁 src/components/admin/FileUpload.tsx
interface FileUploadProps {
  acceptedTypes?: string;
  maxSize?: number; // MB
  onUpload: (file: File) => Promise<string>; // returns file URL
}

export const FileUpload = ({ acceptedTypes = '.pdf,.jpg,.png', maxSize = 5, onUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`파일 크기는 ${maxSize}MB를 초과할 수 없습니다.`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      const uploadPromise = new Promise<string>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.fileUrl);
          } else {
            reject(new Error('업로드 실패'));
          }
        };
        xhr.onerror = () => reject(new Error('업로드 실패'));
      });

      xhr.open('POST', '/api/proxy/admin/upload');
      xhr.setRequestHeader('X-Admin-Id', user?.id.toString() || '');
      xhr.send(formData);

      const fileUrl = await uploadPromise;
      await onUpload(fileUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
          handleFileUpload(files[0]);
        }
      }}
    >
      {isUploading ? (
        <div>
          <div className="mb-2">업로드 중... {Math.round(uploadProgress)}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div>
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            파일을 드래그하거나 클릭하여 업로드하세요
          </p>
          <p className="text-xs text-gray-500">
            지원 형식: {acceptedTypes} | 최대 크기: {maxSize}MB
          </p>
          <input
            type="file"
            accept={acceptedTypes}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            파일 선택
          </label>
        </div>
      )}
    </div>
  );
};
```

---

### 9. 알림/로그 시스템

#### 9.1 활동 로그 타입 정의
```typescript
// 📁 src/types/log.ts
export interface ActivityLog {
  id: number;
  adminId: number;
  adminName: string;
  action: string;        // 'LOGIN', 'CREATE_ESTIMATE', 'UPDATE_STATUS', etc.
  targetType: string;    // 'ESTIMATE', 'ADMIN', 'COMPANY'
  targetId?: number;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface LogFilter {
  adminId?: number;
  action?: string;
  targetType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
```

#### 9.2 활동 로그 컴포넌트
```typescript
// 📁 src/components/admin/ActivityLog.tsx
export const ActivityLog = () => {
  const [filter, setFilter] = useState<LogFilter>({
    page: 1,
    limit: 50
  });

  const { logs, isLoading } = useActivityLogs(filter);

  const actionIcons = {
    LOGIN: <LogIn className="h-4 w-4 text-green-600" />,
    CREATE_ESTIMATE: <Plus className="h-4 w-4 text-blue-600" />,
    UPDATE_STATUS: <Edit className="h-4 w-4 text-orange-600" />,
    DELETE: <Trash className="h-4 w-4 text-red-600" />,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>활동 로그</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 필터 */}
        <div className="flex gap-4 mb-4">
          <select
            value={filter.action || ''}
            onChange={(e) => setFilter(prev => ({ ...prev, action: e.target.value || undefined }))}
            className="border rounded px-3 py-2"
          >
            <option value="">모든 활동</option>
            <option value="LOGIN">로그인</option>
            <option value="CREATE_ESTIMATE">견적 생성</option>
            <option value="UPDATE_STATUS">상태 변경</option>
            <option value="DELETE">삭제</option>
          </select>
          
          <input
            type="date"
            value={filter.startDate || ''}
            onChange={(e) => setFilter(prev => ({ ...prev, startDate: e.target.value || undefined }))}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* 로그 목록 */}
        <div className="space-y-2">
          {logs?.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-3 border rounded">
              <div className="mt-1">
                {actionIcons[log.action as keyof typeof actionIcons] || 
                 <Activity className="h-4 w-4 text-gray-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{log.adminName}</span>
                  <span className="text-sm text-gray-500">#{log.adminId}</span>
                  <span className="text-xs text-gray-400">
                    {format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{log.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

---

## 🚀 **구현 단계별 가이드**

### Phase 1: 관리자 계정 관리 (1-2일)
1. 타입 정의 확장
2. AdminManagement 컴포넌트 구현
3. AdminForm, AdminTable 하위 컴포넌트 구현
4. useAdminManagement 훅 구현
5. 라우팅 및 권한 가드 추가

### Phase 2: 견적 전체 수정 기능 (1일)
1. EstimateEditForm 컴포넌트 구현
2. 기존 EstimateDetail 페이지에 수정 모드 추가
3. API 확장 (전체 필드 수정 지원)

### Phase 3: 권한별 UI 제어 (0.5일)
1. AdminGuard, ConditionalRender 컴포넌트 구현
2. 기존 컴포넌트들에 권한 제어 적용

### Phase 4: 편의성 기능 (2-3일)
1. 차량 검색 API 연동
2. 통계 대시보드 강화
3. 데이터 내보내기 기능

### Phase 5: 확장성 기능 (3-4일)
1. 회사 관리 시스템
2. 파일 관리 시스템  
3. 활동 로그 시스템

---

## 📝 **구현 시 주의사항**

### API 관련
- 모든 API는 `/api/proxy` 프록시를 통해 호출
- `X-Admin-Id` 헤더 필수 포함
- Base64 패스워드 인코딩 필수
- 에러 처리 및 사용자 피드백 제공

### 보안 관련  
- 최고관리자 권한 체크 강화
- 본인 계정 삭제 방지
- 민감한 작업 시 확인 모달 표시
- XSS 방지를 위한 입력값 검증

### UX 관련
- 로딩 상태 표시
- 성공/실패 메시지 제공
- 반응형 디자인 고려
- 키보드 접근성 지원

### 코드 품질
- TypeScript 타입 안정성 확보
- 컴포넌트 재사용성 고려
- 에러 바운더리 적용
- 테스트 코드 작성 권장

이 문서를 기반으로 단계별로 구현하면 완전한 관리자 시스템을 구축할 수 있습니다.