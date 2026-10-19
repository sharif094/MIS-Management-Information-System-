const storageKeys = {
  employees: 'mis-employee-records',
  assets: 'mis-asset-records',
  attendance: 'mis-attendance-records',
  leaveRequests: 'mis-leave-records',
  payroll: 'mis-payroll-records',
  candidates: 'mis-candidate-records',
  appraisals: 'mis-appraisal-records',
  documents: 'mis-document-records',
  business: 'mis-selected-business'
};
const hrSchemaVersionKey = 'mis-hr-schema-version';

const businesses = [
  { id: 'city-care-main', name: 'City Care Hospital – Main Branch' },
  { id: 'city-care-north', name: 'City Care Hospital – North Wing' },
  { id: 'city-care-south', name: 'City Care Hospital – South Wing' }
];

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

function inclusiveDays(startDate, endDate) {
  if (!startDate || !endDate || endDate < startDate) return 0;
  return Math.floor((new Date(`${endDate}T00:00:00`) - new Date(`${startDate}T00:00:00`)) / 86400000) + 1;
}

const sampleEmployees = [
  { id: 1, employeeCode: 'EMP-1001', name: 'Aisha Rahman', email: 'aisha.rahman@company.com', phone: '+91 98765 10001', businessId: 'city-care-main', department: 'Human Resources', role: 'HR Manager', employmentType: 'Full-time', joinedDate: '2022-05-12', salary: 960000, status: 'Active' },
  { id: 2, employeeCode: 'EMP-1002', name: 'Daniel Brooks', email: 'daniel.brooks@company.com', phone: '+91 98765 10002', businessId: 'city-care-north', department: 'Engineering', role: 'Senior Developer', employmentType: 'Full-time', joinedDate: '2021-09-03', salary: 1080000, status: 'Active' },
  { id: 3, employeeCode: 'EMP-1003', name: 'Mina Hassan', email: 'mina.hassan@company.com', phone: '+91 98765 10003', businessId: 'city-care-south', department: 'Finance', role: 'Accountant', employmentType: 'Full-time', joinedDate: '2023-02-22', salary: 660000, status: 'On Leave' },
  { id: 4, employeeCode: 'EMP-1004', name: 'Peter Wu', email: 'peter.wu@company.com', phone: '+91 98765 10004', businessId: 'city-care-main', department: 'Operations', role: 'Operations Lead', employmentType: 'Full-time', joinedDate: '2020-11-18', salary: 840000, status: 'Active' },
  { id: 5, employeeCode: 'EMP-1005', name: 'Leena Joseph', email: 'leena.joseph@company.com', phone: '+91 98765 10005', businessId: 'city-care-north', department: 'Nursing', role: 'Ward Nurse', employmentType: 'Full-time', joinedDate: '2024-07-08', salary: 540000, status: 'Active' },
  { id: 6, employeeCode: 'EMP-1006', name: 'Omar Patel', email: 'omar.patel@company.com', phone: '+91 98765 10006', businessId: 'city-care-south', department: 'Medical Services', role: 'Lab Technician', employmentType: 'Full-time', joinedDate: '2024-10-14', salary: 480000, status: 'Active' }
];

const sampleAssets = [
  { id: 101, name: 'Dell Latitude 7440', type: 'Laptop', serialNumber: 'DL-7440-201', assignedTo: 'Aisha Rahman', status: 'Assigned' },
  { id: 102, name: 'Apple MacBook Pro', type: 'Laptop', serialNumber: 'MBP-4582', assignedTo: 'Daniel Brooks', status: 'Assigned' },
  { id: 103, name: 'HP LaserJet Pro', type: 'Printer', serialNumber: 'HP-3321', assignedTo: '', status: 'Available' },
  { id: 104, name: 'Dell 27-inch Monitor', type: 'Monitor', serialNumber: 'DLM-9900', assignedTo: 'Peter Wu', status: 'Assigned' }
];

const currentPeriod = localDateString().slice(0, 7);
const sampleAttendance = sampleEmployees.map((employee, index) => ({
  id: `att-${employee.id}-${localDateString()}`,
  employeeId: employee.id,
  date: localDateString(),
  status: ['Present', 'Present', 'On Leave', 'Late', 'Present', 'Present'][index]
}));

const sampleLeaves = [
  { id: 'leave-1', employeeId: 4, type: 'Annual', startDate: dateOffset(5), endDate: dateOffset(7), days: 3, reason: 'Family commitment', status: 'Pending', businessId: 'city-care-main' },
  { id: 'leave-2', employeeId: 3, type: 'Sick', startDate: dateOffset(-2), endDate: dateOffset(1), reason: 'Recovery', status: 'Approved', businessId: 'city-care-south' }
];

const samplePayroll = sampleEmployees
  .filter((employee) => employee.status === 'Active')
  .slice(0, 3)
  .map((employee) => {
    const gross = Math.round(employee.salary / 12);
    const deductions = Math.round(gross * 0.08);
    return { id: `pay-${employee.id}-${currentPeriod}`, employeeId: employee.id, period: currentPeriod, gross, deductions, net: gross - deductions, businessId: employee.businessId };
  });

const sampleCandidates = [
  { id: 'candidate-1', name: 'Riya Sharma', email: 'riya.sharma@example.com', role: 'Staff Nurse', department: 'Nursing', interviewDate: dateOffset(2), stage: 'Interview scheduled', businessId: 'city-care-main' },
  { id: 'candidate-2', name: 'Arjun Mehta', email: 'arjun.mehta@example.com', role: 'Accounts Executive', department: 'Finance', interviewDate: dateOffset(4), stage: 'Screening', businessId: 'city-care-south' }
];

const sampleAppraisals = [
  { id: 'review-1', employeeId: 1, period: 'Q2 2026', rating: 5, feedback: 'Strong leadership and team support.', businessId: 'city-care-main' },
  { id: 'review-2', employeeId: 4, period: 'Q2 2026', rating: 4, feedback: 'Consistent team leadership and collaboration.', businessId: 'city-care-main' }
];

const sampleDocuments = [
  { id: 'doc-1', employeeId: 1, name: 'Aisha-Rahman-Joining-Form.pdf', type: 'Joining form', expiryDate: '', dataUrl: '', size: 0, businessId: 'city-care-main' },
  { id: 'doc-2', employeeId: 4, name: 'Peter-Wu-Identity-Proof.pdf', type: 'Identity proof', expiryDate: dateOffset(18), dataUrl: '', size: 0, businessId: 'city-care-main' }
];

function loadData(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.warn(`Failed to parse ${key}:`, error);
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

const state = {
  employees: loadData(storageKeys.employees, sampleEmployees).map((employee, index) => ({
    employmentType: 'Full-time',
    employeeCode: `EMP-${1001 + index}`,
    phone: '',
    salary: 0,
    businessId: 'city-care-main',
    ...employee
  })),
  assets: loadData(storageKeys.assets, sampleAssets),
  attendance: loadData(storageKeys.attendance, sampleAttendance),
  leaveRequests: loadData(storageKeys.leaveRequests, sampleLeaves),
  payroll: loadData(storageKeys.payroll, samplePayroll),
  candidates: loadData(storageKeys.candidates, sampleCandidates),
  appraisals: loadData(storageKeys.appraisals, sampleAppraisals),
  documents: loadData(storageKeys.documents, sampleDocuments),
  selectedBusiness: localStorage.getItem(storageKeys.business) || 'all'
};
state.leaveRequests = state.leaveRequests.map((request) => ({
  ...request,
  days: Number(request.days) || inclusiveDays(request.startDate, request.endDate)
}));

const employeeForm = document.getElementById('employeeForm');
const assetForm = document.getElementById('assetForm');
const employeeTableBody = document.getElementById('employeeTableBody');
const assetTableBody = document.getElementById('assetTableBody');
const employeeSearch = document.getElementById('employeeSearch');
const employeeStatusFilter = document.getElementById('employeeStatusFilter');
const employeeDepartmentFilter = document.getElementById('employeeDepartmentFilter');
const assetOwnerSelect = document.getElementById('assetOwnerSelect');
const businessFilter = document.getElementById('businessFilter');
const portalBusinessFilter = document.getElementById('portalBusinessFilter');

function persistData() {
  try {
    Object.entries(storageKeys).forEach(([key, storageKey]) => {
      if (Object.prototype.hasOwnProperty.call(state, key) && key !== 'selectedBusiness') {
        localStorage.setItem(storageKey, JSON.stringify(state[key]));
      }
    });
    localStorage.setItem(storageKeys.business, state.selectedBusiness);
    return true;
  } catch (error) {
    console.error('Failed to save MIS Business data:', error);
    showMessage('Could not save your changes to this browser. Check available storage and try again.', 'error');
    return false;
  }
}

function showMessage(message, type = 'success') {
  let notice = document.getElementById('appNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'appNotice';
    notice.className = 'app-notice';
    notice.setAttribute('role', 'status');
    document.querySelector('.main-content').prepend(notice);
  }
  notice.textContent = message;
  notice.dataset.type = type;
  notice.hidden = false;
  window.clearTimeout(showMessage.timeoutId);
  showMessage.timeoutId = window.setTimeout(() => { notice.hidden = true; }, 5000);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function getVisibleEmployees() {
  return state.selectedBusiness === 'all'
    ? state.employees
    : state.employees.filter((employee) => employee.businessId === state.selectedBusiness);
}

function getEmployee(employeeId) {
  return state.employees.find((employee) => String(employee.id) === String(employeeId));
}

function getBusinessName(businessId) {
  return businesses.find((business) => business.id === businessId)?.name || 'Unassigned';
}

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return escapeHtml(dateString);
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount) || 0);
}

function getStatusClass(status) {
  const normalized = String(status).toLowerCase();
  if (normalized.includes('inactive')) return 'inactive';
  if (normalized.includes('leave') || normalized.includes('pending') || normalized.includes('screening')) return 'leave';
  if (normalized.includes('reject') || normalized.includes('absent') || normalized.includes('expired')) return 'inactive';
  if (normalized.includes('active') || normalized.includes('present') || normalized.includes('approved') || normalized.includes('hired')) return 'active';
  if (normalized.includes('assigned') || normalized.includes('scheduled') || normalized.includes('review')) return 'assigned';
  if (normalized.includes('available') || normalized.includes('completed') || normalized.includes('processed')) return 'available';
  if (normalized.includes('maintenance') || normalized.includes('late') || normalized.includes('offer')) return 'maintenance';
  return 'assigned';
}

function populateEmployeeSelects() {
  const employees = getVisibleEmployees();
  const fields = document.querySelectorAll('#attendanceForm select[name="employeeId"], #leaveForm select[name="employeeId"], #payrollForm select[name="employeeId"], #appraisalForm select[name="employeeId"], #documentForm select[name="employeeId"]');
  fields.forEach((select) => {
    const selectedValue = select.value;
    select.innerHTML = employees.length
      ? employees.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)}</option>`).join('')
      : '<option value="">No employees available</option>';
    if (employees.some((employee) => String(employee.id) === selectedValue)) select.value = selectedValue;
  });

  const employeeNames = employees.map((employee) => employee.name);
  assetOwnerSelect.innerHTML = '<option value="">Unassigned</option>' +
    employeeNames.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
  const currentOwner = assetForm.dataset.selectedOwner || '';
  if (employeeNames.includes(currentOwner)) assetOwnerSelect.value = currentOwner;
}

function renderSummary() {
  const employees = getVisibleEmployees();
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
  const totalAssets = state.assets.length;
  const availableAssets = state.assets.filter((asset) => asset.status === 'Available').length;

  document.getElementById('totalEmployees').textContent = employees.length;
  document.getElementById('activeEmployees').textContent = activeEmployees;
  document.getElementById('totalAssets').textContent = totalAssets;
  document.getElementById('availableAssets').textContent = availableAssets;
  document.getElementById('statusSummary').textContent = activeEmployees > 0 ? 'All systems operational' : 'Staffing needs review';

  const deptCounts = employees.reduce((counts, employee) => {
    counts[employee.department] = (counts[employee.department] || 0) + 1;
    return counts;
  }, {});
  const departmentSummary = document.getElementById('departmentSummary');
  const departments = Object.entries(deptCounts).sort((left, right) => right[1] - left[1]);
  departmentSummary.innerHTML = departments.map(([department, count]) => `
    <li>
      <div class="department-meta"><span>${escapeHtml(department)}</span><strong>${count} ${count === 1 ? 'employee' : 'employees'}</strong></div>
      <div class="progress-track" aria-label="${Math.round((count / Math.max(employees.length, 1)) * 100)}% of employees"><span style="--bar-width: ${(count / Math.max(employees.length, 1)) * 100}%"></span></div>
    </li>
  `).join('') || '<li class="empty-state">No employee records yet.</li>';

  const assetStatusCounts = state.assets.reduce((counts, asset) => {
    counts[asset.status] = (counts[asset.status] || 0) + 1;
    return counts;
  }, {});
  const assetSummary = document.getElementById('assetSummary');
  const assetDonutChart = document.getElementById('assetDonutChart');
  const assetStatuses = Object.entries(assetStatusCounts).sort((left, right) => right[1] - left[1]);
  const chartColors = ['#2168d4', '#17a38b', '#8157c8', '#e99a25', '#df5963', '#8792a5'];
  let cumulativeAssets = 0;
  const chartSegments = assetStatuses.map(([, count], index) => {
    const start = (cumulativeAssets / Math.max(totalAssets, 1)) * 360;
    cumulativeAssets += count;
    const end = (cumulativeAssets / Math.max(totalAssets, 1)) * 360;
    return `${chartColors[index % chartColors.length]} ${start}deg ${end}deg`;
  });
  assetDonutChart.style.setProperty('--chart-segments', chartSegments.length ? `conic-gradient(${chartSegments.join(', ')})` : 'conic-gradient(#e8eef7 0 100%)');
  assetDonutChart.setAttribute('aria-label', `${totalAssets} assets across ${assetStatuses.length} statuses`);
  document.getElementById('assetDonutTotal').textContent = totalAssets;
  assetSummary.innerHTML = assetStatuses.map(([status, count], index) => `
    <li><span class="legend-dot" style="--legend-color: ${chartColors[index % chartColors.length]}"></span><span>${escapeHtml(status)}</span><strong>${count}</strong></li>
  `).join('') || '<li class="empty-state">No asset records yet.</li>';
}

function renderDepartmentFilter() {
  const currentValue = employeeDepartmentFilter.value || 'All';
  const departments = [...new Set(getVisibleEmployees().map((employee) => employee.department))].sort();
  employeeDepartmentFilter.innerHTML = '<option value="All">All departments</option>' +
    departments.map((department) => `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`).join('');
  if (departments.includes(currentValue)) employeeDepartmentFilter.value = currentValue;
}

function renderEmployees() {
  const searchTerm = employeeSearch.value.trim().toLowerCase();
  const statusFilter = employeeStatusFilter.value;
  const departmentFilter = employeeDepartmentFilter.value;
  const filteredEmployees = getVisibleEmployees().filter((employee) => {
    const searchable = `${employee.name} ${employee.employeeCode} ${employee.email} ${employee.department} ${employee.role}`.toLowerCase();
    return (!searchTerm || searchable.includes(searchTerm)) &&
      (statusFilter === 'All' || employee.status === statusFilter) &&
      (departmentFilter === 'All' || employee.department === departmentFilter);
  });

  employeeTableBody.innerHTML = filteredEmployees.length
    ? filteredEmployees.map((employee) => `
      <tr>
        <td><strong>${escapeHtml(employee.name)}</strong><br /><small>${escapeHtml(employee.employeeCode)} · ${escapeHtml(employee.email)}</small></td>
        <td>${escapeHtml(getBusinessName(employee.businessId))}</td>
        <td>${escapeHtml(employee.department)}</td>
        <td>${escapeHtml(employee.role)}</td>
        <td><span class="badge ${getStatusClass(employee.status)}">${escapeHtml(employee.status)}</span></td>
        <td>${formatDate(employee.joinedDate)}</td>
        <td><button class="delete-btn" data-employee-id="${escapeHtml(employee.id)}" type="button">Remove</button></td>
      </tr>
    `).join('')
    : '<tr><td colspan="7" class="empty-state">No employees match the current filters.</td></tr>';
}

function renderAssets() {
  assetTableBody.innerHTML = state.assets.length
    ? state.assets.map((asset) => `
      <tr>
        <td>${escapeHtml(asset.name)}</td><td>${escapeHtml(asset.type)}</td><td>${escapeHtml(asset.serialNumber)}</td>
        <td>${escapeHtml(asset.assignedTo || 'Unassigned')}</td>
        <td><span class="badge ${getStatusClass(asset.status)}">${escapeHtml(asset.status)}</span></td>
        <td><button class="delete-btn" data-asset-id="${escapeHtml(asset.id)}" type="button">Remove</button></td>
      </tr>
    `).join('')
    : '<tr><td colspan="6" class="empty-state">No assets have been recorded yet.</td></tr>';
}

function renderAttendance() {
  const employees = getVisibleEmployees();
  const records = state.attendance
    .filter((record) => employees.some((employee) => String(employee.id) === String(record.employeeId)))
    .sort((left, right) => right.date.localeCompare(left.date));
  const todayRecords = records.filter((record) => record.date === localDateString());
  const totals = ['Present', 'Late', 'Absent', 'On Leave'].map((status) => ({
    status,
    count: todayRecords.filter((record) => record.status === status).length
  }));
  document.getElementById('attendanceSummary').innerHTML = totals.map((item) =>
    `<div class="mini-metric"><span>${escapeHtml(item.status)} today</span><strong>${item.count}</strong></div>`
  ).join('');
  document.getElementById('attendanceTableBody').innerHTML = records.length
    ? records.map((record) => {
      const employee = getEmployee(record.employeeId);
      if (!employee) return '';
      return `<tr><td>${formatDate(record.date)}</td><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(getBusinessName(employee.businessId))}</td><td><span class="badge ${getStatusClass(record.status)}">${escapeHtml(record.status)}</span></td></tr>`;
    }).join('')
    : '<tr><td colspan="5" class="empty-state">No attendance recorded yet.</td></tr>';
}

function leaveBalance(employeeId, type) {
  const allowances = { Annual: 24, Sick: 10, Personal: 5 };
  if (type === 'Unpaid') return '—';
  const allowance = allowances[type] || 0;
  const used = state.leaveRequests
    .filter((request) => String(request.employeeId) === String(employeeId) && request.type === type && request.status === 'Approved' && request.startDate.slice(0, 4) === localDateString().slice(0, 4))
    .reduce((total, request) => total + Number(request.days || 0), 0);
  return `${Math.max(allowance - used, 0)} / ${allowance} days`;
}

function renderLeaves() {
  const employees = getVisibleEmployees();
  const requests = state.leaveRequests
    .filter((request) => employees.some((employee) => String(employee.id) === String(request.employeeId)))
    .sort((left, right) => (left.status === 'Pending' ? -1 : 1) - (right.status === 'Pending' ? -1 : 1));
  document.getElementById('leaveTableBody').innerHTML = requests.length
    ? requests.map((request) => {
      const employee = getEmployee(request.employeeId);
      if (!employee) return '';
      return `<tr>
        <td><strong>${escapeHtml(employee.name)}</strong><br /><small>${escapeHtml(request.reason)}</small></td>
        <td>${escapeHtml(request.type)}</td><td>${formatDate(request.startDate)} – ${formatDate(request.endDate)}</td>
        <td>${Number(request.days) || 0}</td><td>${leaveBalance(employee.id, request.type)}</td>
        <td><span class="badge ${getStatusClass(request.status)}">${escapeHtml(request.status)}</span></td>
        <td>${request.status === 'Pending' ? `<button class="action-btn" data-leave-action="Approved" data-leave-id="${escapeHtml(request.id)}" type="button">Approve</button> <button class="delete-btn" data-leave-action="Rejected" data-leave-id="${escapeHtml(request.id)}" type="button">Decline</button>` : '—'}</td>
      </tr>`;
    }).join('')
    : '<tr><td colspan="7" class="empty-state">No leave requests yet.</td></tr>';
}

function renderPayroll() {
  const employees = getVisibleEmployees();
  const records = state.payroll.filter((record) => employees.some((employee) => String(employee.id) === String(record.employeeId)));
  document.getElementById('payrollTableBody').innerHTML = records.length
    ? records.map((record) => {
      const employee = getEmployee(record.employeeId);
      if (!employee) return '';
      return `<tr><td>${escapeHtml(record.period)}</td><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(getBusinessName(employee.businessId))}</td><td>${formatCurrency(record.gross)}</td><td>${formatCurrency(record.deductions)}</td><td><strong>${formatCurrency(record.net)}</strong></td><td><button class="action-btn" data-payslip-id="${escapeHtml(record.id)}" type="button">Download</button></td></tr>`;
    }).join('')
    : '<tr><td colspan="7" class="empty-state">No payroll has been processed yet.</td></tr>';
}

function renderCandidates() {
  const candidates = state.candidates.filter((candidate) => state.selectedBusiness === 'all' || candidate.businessId === state.selectedBusiness);
  document.getElementById('candidateTableBody').innerHTML = candidates.length
    ? candidates.map((candidate) => `
      <tr><td><strong>${escapeHtml(candidate.name)}</strong><br /><small>${escapeHtml(candidate.email)}</small></td>
      <td>${escapeHtml(candidate.role)}</td><td>${escapeHtml(candidate.department)}</td><td>${formatDate(candidate.interviewDate)}</td>
      <td><select class="stage-select" data-candidate-stage="${escapeHtml(candidate.id)}" aria-label="Candidate stage">
        ${['Screening', 'Interview scheduled', 'Interviewed', 'Offer', 'Hired', 'Rejected'].map((stage) => `<option${candidate.stage === stage ? ' selected' : ''}>${stage}</option>`).join('')}
      </select></td><td><button class="delete-btn" data-candidate-id="${escapeHtml(candidate.id)}" type="button">Remove</button></td></tr>
    `).join('')
    : '<tr><td colspan="6" class="empty-state">No candidates in the hiring pipeline.</td></tr>';
}

function renderAppraisals() {
  const employees = getVisibleEmployees();
  const appraisals = state.appraisals.filter((appraisal) => employees.some((employee) => String(employee.id) === String(appraisal.employeeId)));
  document.getElementById('appraisalTableBody').innerHTML = appraisals.length
    ? appraisals.map((appraisal) => {
      const employee = getEmployee(appraisal.employeeId);
      if (!employee) return '';
      return `<tr><td><strong>${escapeHtml(employee.name)}</strong></td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(appraisal.period)}</td><td><span class="rating">${'★'.repeat(Number(appraisal.rating))}${'☆'.repeat(5 - Number(appraisal.rating))}</span> ${Number(appraisal.rating)}/5</td><td>${escapeHtml(appraisal.feedback)}</td></tr>`;
    }).join('')
    : '<tr><td colspan="5" class="empty-state">No appraisals have been recorded.</td></tr>';
}

function renderDocuments() {
  const employees = getVisibleEmployees();
  const documents = state.documents.filter((document) => employees.some((employee) => String(employee.id) === String(document.employeeId)));
  document.getElementById('documentTableBody').innerHTML = documents.length
    ? documents.map((document) => {
      const employee = getEmployee(document.employeeId);
      if (!employee) return '';
      const file = document.dataUrl
        ? `<a class="text-link" href="${escapeHtml(document.dataUrl)}" download="${escapeHtml(document.name)}">Download</a>`
        : '<span class="muted-text">Demo record</span>';
      return `<tr><td>${escapeHtml(document.name)}</td><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(document.type)}</td><td>${formatDate(document.expiryDate)}</td><td>${file} <button class="delete-btn" data-document-id="${escapeHtml(document.id)}" type="button">Remove</button></td></tr>`;
    }).join('')
    : '<tr><td colspan="5" class="empty-state">No employee documents yet.</td></tr>';
}

function renderAlerts() {
  const employees = getVisibleEmployees();
  const employeeIds = new Set(employees.map((employee) => String(employee.id)));
  const alerts = [];
  state.leaveRequests.filter((request) => request.status === 'Pending' && employeeIds.has(String(request.employeeId)))
    .forEach((request) => {
      const employee = getEmployee(request.employeeId);
      alerts.push({ date: request.startDate, message: `${employee?.name || 'Employee'} has a pending ${request.type.toLowerCase()} leave request.`, href: '#leave', type: 'Pending approval' });
    });
  state.documents.filter((document) => document.expiryDate && employeeIds.has(String(document.employeeId)))
    .forEach((document) => {
      const daysLeft = Math.ceil((new Date(`${document.expiryDate}T00:00:00`) - new Date(`${localDateString()}T00:00:00`)) / 86400000);
      if (daysLeft <= 30) {
        const employee = getEmployee(document.employeeId);
        alerts.push({ date: document.expiryDate, message: `${document.name} for ${employee?.name || 'employee'} ${daysLeft < 0 ? 'has expired' : `expires in ${daysLeft} days`}.`, href: '#documents', type: daysLeft < 0 ? 'Expired document' : 'Expiring document' });
      }
    });
  alerts.sort((left, right) => left.date.localeCompare(right.date));
  document.getElementById('alertCount').textContent = `${alerts.length} ${alerts.length === 1 ? 'alert' : 'alerts'}`;
  document.getElementById('alertList').innerHTML = alerts.length
    ? alerts.map((alert) => `<li class="alert-item"><span class="alert-icon" aria-hidden="true">!</span><div><strong>${escapeHtml(alert.type)}</strong><p>${escapeHtml(alert.message)}</p></div><a class="text-link" href="${alert.href}">Review →</a></li>`).join('')
    : '<li class="empty-state">No pending approvals or documents expiring in the next 30 days.</li>';
}

function renderAll() {
  businessFilter.value = state.selectedBusiness;
  portalBusinessFilter.value = state.selectedBusiness;
  if (state.selectedBusiness !== 'all') employeeForm.elements.businessId.value = state.selectedBusiness;
  populateEmployeeSelects();
  renderDepartmentFilter();
  renderSummary();
  renderEmployees();
  renderAssets();
  renderAttendance();
  renderLeaves();
  renderPayroll();
  renderCandidates();
  renderAppraisals();
  renderDocuments();
  renderAlerts();
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.href = objectUrl;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

employeeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!employeeForm.reportValidity()) return;
  const formData = new FormData(employeeForm);
  const employeeCode = formData.get('employeeCode').toString().trim();
  const email = formData.get('email').toString().trim().toLowerCase();
  if (state.employees.some((employee) => String(employee.employeeCode).toLowerCase() === employeeCode.toLowerCase() || String(employee.email).toLowerCase() === email)) {
    showMessage('An employee with that employee ID or email already exists.', 'error');
    return;
  }
  const employee = {
    id: createId('employee'),
    employeeCode,
    name: formData.get('name').toString().trim(),
    email,
    phone: formData.get('phone').toString().trim(),
    dateOfBirth: formData.get('dateOfBirth').toString(),
    emergencyContact: formData.get('emergencyContact').toString().trim(),
    homeAddress: formData.get('homeAddress').toString().trim(),
    manager: formData.get('manager').toString().trim(),
    businessId: formData.get('businessId').toString(),
    department: formData.get('department').toString(),
    role: formData.get('role').toString().trim(),
    employmentType: formData.get('employmentType').toString(),
    joinedDate: formData.get('joinedDate').toString(),
    salary: Number(formData.get('salary')),
    status: formData.get('status').toString()
  };
  state.employees.unshift(employee);
  state.selectedBusiness = 'all';
  persistData();
  employeeForm.reset();
  renderAll();
  showMessage(`${employee.name} was added to the employee master list.`);
});

document.getElementById('attendanceForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const employee = getEmployee(formData.get('employeeId'));
  if (!employee) {
    showMessage('Add an employee before recording attendance.', 'error');
    return;
  }
  const date = formData.get('date').toString();
  const record = { id: createId('attendance'), employeeId: employee.id, date, status: formData.get('status').toString() };
  const existing = state.attendance.findIndex((item) => String(item.employeeId) === String(employee.id) && item.date === date);
  if (existing >= 0) state.attendance[existing] = record;
  else state.attendance.unshift(record);
  persistData();
  renderAll();
  showMessage(`Attendance saved for ${employee.name}.`);
});

document.getElementById('leaveForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const employee = getEmployee(formData.get('employeeId'));
  const startDate = formData.get('startDate').toString();
  const endDate = formData.get('endDate').toString();
  if (!employee || endDate < startDate) {
    showMessage('Select a valid employee and an end date on or after the start date.', 'error');
    return;
  }
  const days = inclusiveDays(startDate, endDate);
  state.leaveRequests.unshift({ id: createId('leave'), employeeId: employee.id, type: formData.get('type').toString(), startDate, endDate, days, reason: formData.get('reason').toString().trim(), status: 'Pending', businessId: employee.businessId });
  persistData();
  form.reset();
  renderAll();
  showMessage('Leave request submitted for approval.');
});

document.getElementById('payrollForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const employee = getEmployee(formData.get('employeeId'));
  const period = formData.get('period').toString();
  const deductions = Number(formData.get('deductions'));
  if (!employee || !period || employee.salary <= 0 || deductions < 0) {
    showMessage('Enter a valid payroll period and ensure the employee has an annual salary.', 'error');
    return;
  }
  if (state.payroll.some((record) => String(record.employeeId) === String(employee.id) && record.period === period)) {
    showMessage(`Payroll for ${employee.name} is already processed for ${period}.`, 'error');
    return;
  }
  const gross = Math.round(employee.salary / 12);
  if (deductions > gross) {
    showMessage('Deductions cannot exceed the monthly gross pay.', 'error');
    return;
  }
  state.payroll.unshift({ id: createId('payroll'), employeeId: employee.id, period, gross, deductions, net: gross - deductions, businessId: employee.businessId });
  persistData();
  renderAll();
  showMessage(`Payroll processed for ${employee.name}.`);
});

document.getElementById('candidateForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  state.candidates.unshift({
    id: createId('candidate'),
    name: formData.get('name').toString().trim(),
    email: formData.get('email').toString().trim(),
    role: formData.get('role').toString().trim(),
    department: formData.get('department').toString(),
    interviewDate: formData.get('interviewDate').toString(),
    stage: 'Screening',
    businessId: state.selectedBusiness === 'all' ? businesses[0].id : state.selectedBusiness
  });
  persistData();
  form.reset();
  renderAll();
  showMessage('Candidate added to the recruitment pipeline.');
});

document.getElementById('appraisalForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const employee = getEmployee(formData.get('employeeId'));
  if (!employee) return;
  state.appraisals.unshift({
    id: createId('appraisal'),
    employeeId: employee.id,
    period: formData.get('period').toString().trim(),
    rating: Number(formData.get('rating')),
    feedback: formData.get('feedback').toString().trim(),
    businessId: employee.businessId
  });
  persistData();
  form.reset();
  renderAll();
  showMessage('Performance appraisal saved.');
});

document.getElementById('documentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const file = form.elements.file.files[0];
  const message = document.getElementById('documentMessage');
  if (!file || !form.reportValidity()) return;
  if (file.size > 400 * 1024) {
    message.textContent = 'Choose a file smaller than 400 KB to store it in this browser.';
    message.dataset.type = 'error';
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('error', () => {
    message.textContent = 'The selected file could not be read. Please try again.';
    message.dataset.type = 'error';
  });
  reader.addEventListener('load', () => {
    const formData = new FormData(form);
    const employee = getEmployee(formData.get('employeeId'));
    if (!employee) return;
    const documentRecord = {
      id: createId('document'),
      employeeId: employee.id,
      name: file.name,
      type: formData.get('type').toString(),
      expiryDate: formData.get('expiryDate').toString(),
      dataUrl: reader.result,
      size: file.size,
      businessId: employee.businessId
    };
    state.documents.unshift(documentRecord);
    if (!persistData()) {
      state.documents = state.documents.filter((item) => item.id !== documentRecord.id);
      renderAll();
      message.textContent = 'Browser storage is full. Remove an older document and try again.';
      message.dataset.type = 'error';
      return;
    }
    form.reset();
    message.textContent = `${file.name} uploaded and stored in this browser.`;
    message.dataset.type = 'success';
    renderAll();
    showMessage('Employee document uploaded.');
  });
  reader.readAsDataURL(file);
});

employeeTableBody.addEventListener('click', (event) => {
  const target = event.target.closest('[data-employee-id]');
  if (!target || !window.confirm('Remove this employee and their associated HR records?')) return;
  const employeeId = target.dataset.employeeId;
  const removedEmployee = getEmployee(employeeId);
  state.employees = state.employees.filter((employee) => String(employee.id) !== employeeId);
  state.attendance = state.attendance.filter((record) => String(record.employeeId) !== employeeId);
  state.leaveRequests = state.leaveRequests.filter((record) => String(record.employeeId) !== employeeId);
  state.payroll = state.payroll.filter((record) => String(record.employeeId) !== employeeId);
  state.appraisals = state.appraisals.filter((record) => String(record.employeeId) !== employeeId);
  state.documents = state.documents.filter((record) => String(record.employeeId) !== employeeId);
  state.assets = state.assets.map((asset) => asset.assignedTo === removedEmployee?.name
    ? { ...asset, assignedTo: '', status: 'Available' }
    : asset);
  persistData();
  renderAll();
});

assetTableBody.addEventListener('click', (event) => {
  const target = event.target.closest('[data-asset-id]');
  if (!target) return;
  state.assets = state.assets.filter((asset) => String(asset.id) !== target.dataset.assetId);
  persistData();
  renderAll();
});

document.getElementById('leaveTableBody').addEventListener('click', (event) => {
  const target = event.target.closest('[data-leave-id]');
  if (!target) return;
  const request = state.leaveRequests.find((item) => String(item.id) === target.dataset.leaveId);
  if (!request || request.status !== 'Pending') return;
  request.status = target.dataset.leaveAction;
  persistData();
  renderAll();
  showMessage(`Leave request ${request.status.toLowerCase()}.`);
});

document.getElementById('payrollTableBody').addEventListener('click', (event) => {
  const target = event.target.closest('[data-payslip-id]');
  if (!target) return;
  const record = state.payroll.find((item) => String(item.id) === target.dataset.payslipId);
  const employee = record && getEmployee(record.employeeId);
  if (!record || !employee) return;
  const rows = [
    ['MIS Business Payslip', record.period],
    ['Employee', employee.name],
    ['Employee ID', employee.employeeCode],
    ['Business', getBusinessName(employee.businessId)],
    ['Gross pay', record.gross],
    ['Deductions', record.deductions],
    ['Net pay', record.net]
  ];
  downloadCsv(`${employee.employeeCode}-${record.period}-payslip.csv`, rows);
});

document.getElementById('exportAttendanceBtn').addEventListener('click', () => {
  const employeeById = new Map(getVisibleEmployees().map((employee) => [String(employee.id), employee]));
  const records = state.attendance.filter((record) => employeeById.has(String(record.employeeId)));
  const rows = [['Date', 'Employee ID', 'Employee', 'Department', 'Business', 'Status']];
  records.forEach((record) => {
    const employee = employeeById.get(String(record.employeeId));
    rows.push([record.date, employee.employeeCode, employee.name, employee.department, getBusinessName(employee.businessId), record.status]);
  });
  if (!records.length) {
    showMessage('There are no attendance records to export.', 'error');
    return;
  }
  downloadCsv(`attendance-report-${localDateString()}.csv`, rows);
});

document.getElementById('candidateTableBody').addEventListener('change', (event) => {
  const target = event.target.closest('[data-candidate-stage]');
  if (!target) return;
  const candidate = state.candidates.find((item) => String(item.id) === target.dataset.candidateStage);
  if (!candidate) return;
  candidate.stage = target.value;
  persistData();
  renderAll();
});

document.getElementById('candidateTableBody').addEventListener('click', (event) => {
  const target = event.target.closest('[data-candidate-id]');
  if (!target) return;
  state.candidates = state.candidates.filter((candidate) => String(candidate.id) !== target.dataset.candidateId);
  persistData();
  renderAll();
});

document.getElementById('documentTableBody').addEventListener('click', (event) => {
  const target = event.target.closest('[data-document-id]');
  if (!target) return;
  state.documents = state.documents.filter((document) => String(document.id) !== target.dataset.documentId);
  persistData();
  renderAll();
});

employeeSearch.addEventListener('input', renderEmployees);
employeeStatusFilter.addEventListener('change', renderEmployees);
employeeDepartmentFilter.addEventListener('change', renderEmployees);
businessFilter.addEventListener('change', () => {
  state.selectedBusiness = businessFilter.value;
  persistData();
  renderAll();
});

portalBusinessFilter.addEventListener('change', () => {
  state.selectedBusiness = portalBusinessFilter.value;
  persistData();
  renderAll();
});

assetOwnerSelect.addEventListener('change', (event) => {
  assetForm.dataset.selectedOwner = event.target.value;
});

document.querySelectorAll('[data-open-form]').forEach((button) => {
  button.addEventListener('click', () => {
    const form = document.getElementById(button.dataset.openForm);
    form.classList.toggle('form-open');
    if (form.classList.contains('form-open')) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const moduleRoutes = {
  hr: { hash: '#employees', title: 'HR dashboard', description: 'Manage your workforce, attendance, payroll, and HR operations.' },
  assets: { hash: '#assets', title: 'Asset management', description: 'Track and manage company equipment and assignments.' },
  documents: { hash: '#documents', title: 'Documents monitoring', description: 'Monitor employee documents, approvals, and expiry dates.' },
  taxes: { hash: '#taxes', title: 'All taxes monitoring', description: 'Tax returns, payments, deadlines, and compliance tracking.' },
  reports: { hash: '#analytics', title: 'Other MIS reporting', description: 'Department analytics and business insights.' }
};

const moduleHashRoutes = {
  '#overview': 'reports',
  '#analytics': 'reports',
  '#alerts': 'documents',
  '#onboarding': 'hr',
  '#employees': 'hr',
  '#attendance': 'hr',
  '#leave': 'hr',
  '#payroll': 'hr',
  '#recruitment': 'hr',
  '#performance': 'hr',
  '#documents': 'documents',
  '#assets': 'assets',
  '#records': 'assets',
  '#taxes': 'taxes'
};

function setActiveModule(moduleId, updateHash = true) {
  if (moduleId === 'portal' || !moduleRoutes[moduleId]) {
    document.body.classList.add('portal-mode');
    delete document.body.dataset.activeModule;
    document.getElementById('taxes').hidden = true;
    document.querySelectorAll('.nav a').forEach((link) => {
      link.classList.toggle('active', link.dataset.openModule === 'portal');
    });
    updateModuleNavActive();
    if (updateHash && window.location.hash !== '#modules') window.location.hash = '#modules';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const route = moduleRoutes[moduleId];
  document.body.classList.remove('portal-mode');
  document.body.dataset.activeModule = moduleId;
  document.getElementById('taxes').hidden = moduleId !== 'taxes';
  document.querySelector('.page-heading h1').textContent = route.title;
  document.querySelector('.page-description').textContent = route.description;
  document.querySelectorAll('.nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.openModule === moduleId);
  });
  updateModuleNavActive(moduleId, route.hash);

  if (updateHash && window.location.hash !== route.hash) {
    window.location.hash = route.hash;
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateModuleNavActive(moduleId = document.body.dataset.activeModule, hash = window.location.hash) {
  document.querySelectorAll('.module-side-nav a').forEach((link) => {
    const menu = link.closest('.module-side-nav');
    link.classList.toggle('active', menu?.classList.contains(`${moduleId}-nav`) && link.getAttribute('href') === hash);
  });
}

document.querySelectorAll('[data-module]').forEach((card) => {
  card.addEventListener('click', () => {
    setActiveModule(card.dataset.module);
  });
});

document.getElementById('moduleHomeBtn').addEventListener('click', () => setActiveModule('portal'));
document.querySelectorAll('[data-return-home]').forEach((button) => {
  button.addEventListener('click', () => setActiveModule('portal'));
});

document.querySelector('.nav').addEventListener('click', (event) => {
  const link = event.target.closest('a[data-open-module]');
  if (!link) return;
  event.preventDefault();
  setActiveModule(link.dataset.openModule);
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash || '#modules';
  if (hash === '#modules') {
    setActiveModule('portal', false);
    return;
  }

  const activeModule = document.body.dataset.activeModule;
  const targetSection = document.getElementById(hash.slice(1));
  const targetModules = targetSection?.dataset.modulePage?.split(' ') || [];
  if (activeModule && targetModules.includes(activeModule)) {
    updateModuleNavActive(activeModule, hash);
    return;
  }
  setActiveModule(moduleHashRoutes[hash] || 'portal', false);
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
  if (!asset.name || !asset.type || !asset.serialNumber) return;
  state.assets.unshift(asset);
  persistData();
  assetForm.reset();
  assetForm.dataset.selectedOwner = '';
  renderAll();
  showMessage('Asset added to inventory.');
});

document.getElementById('resetDemoDataBtn').addEventListener('click', () => {
  if (!window.confirm('Reset all employee, attendance, leave, payroll, recruitment, appraisal, and document data to the sample data?')) return;
  state.employees = sampleEmployees.map((employee) => ({ ...employee }));
  state.assets = sampleAssets.map((asset) => ({ ...asset }));
  state.attendance = sampleAttendance.map((record) => ({ ...record }));
  state.leaveRequests = sampleLeaves.map((request) => ({ ...request }));
  state.payroll = samplePayroll.map((record) => ({ ...record }));
  state.candidates = sampleCandidates.map((candidate) => ({ ...candidate }));
  state.appraisals = sampleAppraisals.map((appraisal) => ({ ...appraisal }));
  state.documents = sampleDocuments.map((document) => ({ ...document }));
  state.selectedBusiness = 'all';
  persistData();
  renderAll();
  showMessage('Sample data restored.');
});

if (localStorage.getItem(hrSchemaVersionKey) !== '1') {
  const employeeIds = new Set(state.employees.map((employee) => String(employee.id)));
  state.attendance = sampleAttendance.filter((record) => employeeIds.has(String(record.employeeId)));
  state.leaveRequests = sampleLeaves.filter((request) => employeeIds.has(String(request.employeeId)));
  state.payroll = samplePayroll.filter((record) => employeeIds.has(String(record.employeeId)));
  state.appraisals = sampleAppraisals.filter((appraisal) => employeeIds.has(String(appraisal.employeeId)));
  state.documents = sampleDocuments.filter((document) => employeeIds.has(String(document.employeeId)));
  if (persistData()) localStorage.setItem(hrSchemaVersionKey, '1');
}

document.getElementById('attendanceForm').elements.date.value = localDateString();
document.getElementById('payrollForm').elements.period.value = currentPeriod;
renderAll();
const initialHash = window.location.hash || '#modules';
if (initialHash === '#modules') {
  setActiveModule('portal', false);
} else {
  setActiveModule(moduleHashRoutes[initialHash] || 'portal', false);
}
