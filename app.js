const employeeStorageKey = 'mis-employee-records';
const assetStorageKey = 'mis-asset-records';

const sampleEmployees = [
  {
    id: 1,
    name: 'Aisha Rahman',
    email: 'aisha.rahman@company.com',
    department: 'Human Resources',
    role: 'HR Manager',
    joinedDate: '2022-05-12',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Daniel Brooks',
    email: 'daniel.brooks@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    joinedDate: '2021-09-03',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Mina Hassan',
    email: 'mina.hassan@company.com',
    department: 'Finance',
    role: 'Accountant',
    joinedDate: '2023-02-22',
    status: 'On Leave'
  },
  {
    id: 4,
    name: 'Peter Wu',
    email: 'peter.wu@company.com',
    department: 'Operations',
    role: 'Operations Lead',
    joinedDate: '2020-11-18',
    status: 'Active'
  }
];

const sampleAssets = [
  {
    id: 101,
    name: 'Dell Latitude 7440',
    type: 'Laptop',
    serialNumber: 'DL-7440-201',
    assignedTo: 'Aisha Rahman',
    status: 'Assigned'
  },
  {
    id: 102,
    name: 'Apple MacBook Pro',
    type: 'Laptop',
    serialNumber: 'MBP-4582',
    assignedTo: 'Daniel Brooks',
    status: 'Assigned'
  },
  {
    id: 103,
    name: 'HP LaserJet Pro',
    type: 'Printer',
    serialNumber: 'HP-3321',
    assignedTo: '',
    status: 'Available'
  },
  {
    id: 104,
    name: 'Dell 27-inch Monitor',
    type: 'Monitor',
    serialNumber: 'DLM-9900',
    assignedTo: 'Peter Wu',
    status: 'Assigned'
  }
];

const state = {
  employees: loadData(employeeStorageKey, sampleEmployees),
  assets: loadData(assetStorageKey, sampleAssets)
};

const employeeForm = document.getElementById('employeeForm');
const assetForm = document.getElementById('assetForm');
const employeeTableBody = document.getElementById('employeeTableBody');
const assetTableBody = document.getElementById('assetTableBody');
const employeeSearch = document.getElementById('employeeSearch');
const employeeStatusFilter = document.getElementById('employeeStatusFilter');
const assetOwnerSelect = document.getElementById('assetOwnerSelect');
const statusSummary = document.getElementById('statusSummary');

function loadData(key, fallback) {
  const raw = localStorage.getItem(key);

  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.warn(`Failed to parse ${key}:`, error);
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function saveData() {
  localStorage.setItem(employeeStorageKey, JSON.stringify(state.employees));
  localStorage.setItem(assetStorageKey, JSON.stringify(state.assets));
}

function updateOwnerSelect() {
  const employeeNames = state.employees.map((employee) => employee.name);

  assetOwnerSelect.innerHTML = '<option value="">Unassigned</option>' +
    employeeNames
      .map((name) => `<option value="${name}">${name}</option>`)
      .join('');

  const currentValue = assetForm.dataset.selectedOwner || '';
  if (employeeNames.includes(currentValue)) {
    assetOwnerSelect.value = currentValue;
  }
}

function formatDate(dateString) {
  if (!dateString) return '—';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function getStatusClass(status) {
  const normalized = status.toLowerCase();

  if (normalized.includes('active')) return 'active';
  if (normalized.includes('leave')) return 'leave';
  if (normalized.includes('inactive')) return 'inactive';
  if (normalized.includes('assigned')) return 'assigned';
  if (normalized.includes('available')) return 'available';
  if (normalized.includes('maintenance')) return 'maintenance';

  return 'active';
}

function renderSummary() {
  const totalEmployees = state.employees.length;
  const activeEmployees = state.employees.filter((employee) => employee.status === 'Active').length;
  const totalAssets = state.assets.length;
  const availableAssets = state.assets.filter((asset) => asset.status === 'Available').length;

  document.getElementById('totalEmployees').textContent = totalEmployees;
  document.getElementById('activeEmployees').textContent = activeEmployees;
  document.getElementById('totalAssets').textContent = totalAssets;
  document.getElementById('availableAssets').textContent = availableAssets;

  statusSummary.textContent = activeEmployees > 0 ? 'Operational' : 'Review required';

  const deptCounts = state.employees.reduce((accumulator, employee) => {
    accumulator[employee.department] = (accumulator[employee.department] || 0) + 1;
    return accumulator;
  }, {});

  const departmentSummary = document.getElementById('departmentSummary');
  departmentSummary.innerHTML = Object.entries(deptCounts)
    .map(([department, count]) => `
      <li>
        <span>${department}</span>
        <strong>${count}</strong>
      </li>
    `)
    .join('') || '<li><span>No departments</span><strong>0</strong></li>';

  const assetStatusCounts = state.assets.reduce((accumulator, asset) => {
    accumulator[asset.status] = (accumulator[asset.status] || 0) + 1;
    return accumulator;
  }, {});

  const assetSummary = document.getElementById('assetSummary');
  assetSummary.innerHTML = Object.entries(assetStatusCounts)
    .map(([status, count]) => `
      <li>
        <span>${status}</span>
        <strong>${count}</strong>
      </li>
    `)
    .join('') || '<li><span>No assets</span><strong>0</strong></li>';
}

function renderEmployees() {
  const searchTerm = employeeSearch.value.trim().toLowerCase();
  const statusFilter = employeeStatusFilter.value;

  const filteredEmployees = state.employees.filter((employee) => {
    const matchesSearch = !searchTerm ||
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm) ||
      employee.role.toLowerCase().includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!filteredEmployees.length) {
    employeeTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No employees match the current filter.</td></tr>';
    return;
  }

  employeeTableBody.innerHTML = filteredEmployees
    .map((employee) => `
      <tr>
        <td>
          <strong>${employee.name}</strong><br />
          <small>${employee.email}</small>
        </td>
        <td>${employee.department}</td>
        <td>${employee.role}</td>
        <td><span class="badge ${getStatusClass(employee.status)}">${employee.status}</span></td>
        <td>${formatDate(employee.joinedDate)}</td>
        <td>
          <button class="delete-btn" data-employee-id="${employee.id}" type="button">Remove</button>
        </td>
      </tr>
    `)
    .join('');
}

function renderAssets() {
  if (!state.assets.length) {
    assetTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No assets have been recorded yet.</td></tr>';
    return;
  }

  assetTableBody.innerHTML = state.assets
    .map((asset) => `
      <tr>
        <td>${asset.name}</td>
        <td>${asset.type}</td>
        <td>${asset.serialNumber}</td>
        <td>${asset.assignedTo || 'Unassigned'}</td>
        <td><span class="badge ${getStatusClass(asset.status)}">${asset.status}</span></td>
        <td>
          <button class="delete-btn" data-asset-id="${asset.id}" type="button">Remove</button>
        </td>
      </tr>
    `)
    .join('');
}

function renderAll() {
  updateOwnerSelect();
  renderSummary();
  renderEmployees();
  renderAssets();
}

employeeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(employeeForm);
  const employee = {
    id: Date.now(),
    name: formData.get('name').toString().trim(),
    email: formData.get('email').toString().trim(),
    department: formData.get('department').toString(),
    role: formData.get('role').toString().trim(),
    joinedDate: formData.get('joinedDate').toString(),
    status: formData.get('status').toString()
  };

  if (!employee.name || !employee.email || !employee.department || !employee.role || !employee.joinedDate) {
    return;
  }

  state.employees.unshift(employee);
  saveData();
  employeeForm.reset();
  renderAll();
});

assetForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(assetForm);
  const asset = {
    id: Date.now(),
    name: formData.get('name').toString().trim(),
    type: formData.get('type').toString(),
    serialNumber: formData.get('serialNumber').toString().trim(),
    status: formData.get('status').toString(),
    assignedTo: formData.get('assignedTo').toString() || ''
  };

  if (!asset.name || !asset.type || !asset.serialNumber) {
    return;
  }

  state.assets.unshift(asset);
  saveData();
  assetForm.reset();
  assetForm.dataset.selectedOwner = '';
  renderAll();
});

employeeTableBody.addEventListener('click', (event) => {
  const target = event.target.closest('[data-employee-id]');
  if (!target) return;

  const employeeId = Number(target.dataset.employeeId);
  state.employees = state.employees.filter((employee) => employee.id !== employeeId);

  state.assets = state.assets.map((asset) => {
    if (asset.assignedTo && state.employees.every((employee) => employee.name !== asset.assignedTo)) {
      return { ...asset, assignedTo: '', status: 'Available' };
    }
    return asset;
  });

  saveData();
  renderAll();
});

assetTableBody.addEventListener('click', (event) => {
  const target = event.target.closest('[data-asset-id]');
  if (!target) return;

  const assetId = Number(target.dataset.assetId);
  state.assets = state.assets.filter((asset) => asset.id !== assetId);
  saveData();
  renderAll();
});

employeeSearch.addEventListener('input', renderEmployees);
employeeStatusFilter.addEventListener('change', renderEmployees);

assetOwnerSelect.addEventListener('change', (event) => {
  assetForm.dataset.selectedOwner = event.target.value;
});

document.getElementById('resetDemoDataBtn').addEventListener('click', () => {
  state.employees = [...sampleEmployees];
  state.assets = [...sampleAssets];
  saveData();
  renderAll();
});

renderAll();
