document.addEventListener('DOMContentLoaded', function() {
    const componentsContainer = document.getElementById('components-container');
    const addComponentBtn = document.getElementById('add-component-btn');
    const gradeForm = document.getElementById('grade-form');
    const resultDiv = document.getElementById('result'); // legacy reference (not used for modal)
    const resultOverlay = document.getElementById('result-overlay');
    const closeResultBtn = document.getElementById('close-result');
    const currentTotalWeightEl = document.getElementById('current-total-weight');
    const failToggle = document.getElementById('fail-toggle');

    const updateTotalWeight = () => {
        let totalWeight = 0;
        const rows = componentsContainer.querySelectorAll('.component-row');
        rows.forEach(row => {
            const weightInput = row.querySelector('.component-weight');
            const weight = parseFloat(weightInput.value);
            if (!isNaN(weight) && weight > 0) {
                totalWeight += weight;
            }
        });
        currentTotalWeightEl.textContent = `${totalWeight}%`;

        currentTotalWeightEl.classList.remove('text-blue-600', 'text-green-600', 'text-red-600');
        if (totalWeight > 100) {
            currentTotalWeightEl.classList.add('text-red-600');
        } else if (totalWeight === 100) {
            currentTotalWeightEl.classList.add('text-green-600');
        } else {
            currentTotalWeightEl.classList.add('text-blue-600');
        }
    };

    const createComponentRow = (name = '', weight = '', score = '') => {
        const row = document.createElement('div');
        // Now using 11-column layout (5 + 2 + 2 + 1 + 1) to remove final-checkbox column
        row.className = 'grid grid-cols-11 gap-2 md:gap-4 items-center component-row p-1.5 hover:bg-slate-50 rounded-lg';
        
        row.innerHTML = `
            <div class="col-span-5">
                <input type="text" class="form-input w-full bg-slate-100 border-transparent rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500" placeholder="VD: Chuyên cần" value="${name}">
            </div>
            <div class="col-span-2">
                <input type="number" class="form-input component-weight w-full bg-slate-100 border-transparent rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500" placeholder="%" min="0" max="100" step="1" value="${weight}">
            </div>
            <div class="col-span-2">
                <input type="number" class="form-input component-score w-full bg-slate-100 border-transparent rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500" placeholder="Điểm" min="0" max="10" step="0.1" value="${score}">
            </div>
            <div class="col-span-1 flex justify-center">
                <button type="button" class="remove-btn text-slate-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>
            </div>
            <div class="col-span-1">&nbsp;</div>
        `;
        componentsContainer.appendChild(row);

        // when name changes, reassess auto-enable for fail toggle
        const nameInput = row.querySelector('input[type="text"]');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                checkAutoEnableFailToggle();
            });
        }
        return row;
    };

    // New default columns as requested (names can still be edited by user)
    createComponentRow('Chuyên cần 1:', 5, '');
    createComponentRow('Chuyên cần 2:', 5, '');
    createComponentRow('Giữa kì 1:', 20, '');
    createComponentRow('Giữa kì 2:', 20, '');
    createComponentRow('Cuối kì:', 40, '');
    createComponentRow('Điểm khác:', 10, '');
    updateTotalWeight();

    // Utility: normalize string by removing diacritics and lowercasing
    const normalize = (s) => {
        if (!s) return '';
        return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    };

    // Check whether any component name suggests a 'giữa kì' and auto-enable fail toggle
    const checkAutoEnableFailToggle = () => {
        if (!failToggle) return;
        const rows = componentsContainer.querySelectorAll('.component-row');
        let found = false;
        rows.forEach(row => {
            const nameInput = row.querySelector('input[type="text"]');
            const name = nameInput ? normalize(nameInput.value) : '';
            // look for 'giua' + optional spaces + 'ki' (covers 'giữa kì' and ascii variants)
            if (/\bgiua\s*ki\b/.test(name)) {
                found = true;
            }
        });
        if (found) {
            // automatically enable the toggle so liệt checks run
            failToggle.checked = true;
        }
    };

    addComponentBtn.addEventListener('click', () => {
        createComponentRow();
        updateTotalWeight();
        checkAutoEnableFailToggle();
    });

    componentsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            e.target.closest('.component-row').remove();
            updateTotalWeight();
            checkAutoEnableFailToggle();
        }
    });

    // Removed final-exam checkbox logic — tool no longer treats any component specially

    componentsContainer.addEventListener('input', function(e) {
        if (e.target.classList.contains('component-score')) {
            if (parseFloat(e.target.value) > 10) {
                alert('Điểm không hợp lệ. Vui lòng chỉ nhập điểm trong thang điểm 10.');
                e.target.value = '';
            }
        }
        if (e.target.classList.contains('component-weight')) {
            updateTotalWeight();
        }
    });

    gradeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let totalWeightedScore = 0;
        let totalWeight = 0;
    // finalExamScore removed — all components treated uniformly
        let hasInput = false;

        const rows = componentsContainer.querySelectorAll('.component-row');
        rows.forEach(row => {
            const weightInput = row.querySelector('.component-weight');
            const scoreInput = row.querySelector('.component-score');
            
            const weight = parseFloat(weightInput.value);
            const score = parseFloat(scoreInput.value);

            if (!isNaN(weight) && !isNaN(score) && weight > 0) {
                hasInput = true;
                totalWeight += weight;
                totalWeightedScore += score * (weight / 100);
                
                // If fail-toggle is ON, treat components whose name contains 'giữa' or 'cuối' as exam
                // and mark automatic fail if score <= 1.0
                if (failToggle && failToggle.checked) {
                    const nameInput = row.querySelector('input[type="text"]');
                    const name = nameInput ? nameInput.value.toLowerCase() : '';
                    if ((name.includes('giữa') || name.includes('giua')) && !isNaN(score)) {
                        if (score <= 1.0) {
                            // mark special fail reason using a data attribute on the row
                            row.dataset.failedBy = 'exam-fail';
                        }
                    }
                }
            }
        });
        
        if (!hasInput) {
            alert('Vui lòng nhập ít nhất một cột điểm có trọng số và điểm số hợp lệ.');
            return;
        }

        if (totalWeight > 100) {
            alert('Tổng trọng số đã vượt quá 100%. Vui lòng kiểm tra lại.');
            // ensure modal closed
            if (resultOverlay) resultOverlay.classList.remove('show');
            return;
        }

        const finalScore = parseFloat(totalWeightedScore.toFixed(2));
        let letterGrade, classification, status, statusClass, score4, note = '';
        let isFailed = false;

        const noteEl = document.getElementById('note');
        if (totalWeight < 100) {
            note = `Lưu ý: Tổng trọng số hiện tại là ${totalWeight}%, không phải 100%.`;
            noteEl.className = 'text-center font-medium mt-4 text-sm text-orange-600';
        } else {
            note = '';
            noteEl.className = 'text-center font-medium mt-4 text-sm';
        }

        // if any row had data-failedBy set, it's an automatic fail due to liệt
        const failedByExam = Array.from(componentsContainer.querySelectorAll('.component-row')).some(r => r.dataset.failedBy === 'exam-fail');
        if (failedByExam) {
            isFailed = true;
            note += (note ? '<br>' : '') + 'Nợ môn do điểm liệt (điểm giữa/cuối <= 1.0)';
        } else if (finalScore < 4.0) {
            isFailed = true;
            note += (note ? '<br>' : '') + 'Nợ môn do điểm tổng kết học phần dưới 4.0';
        }
        
        if (isFailed) {
             noteEl.classList.add('text-red-600');
        }

        if (finalScore >= 9.5) { letterGrade = 'A+'; score4 = 4.0; classification = 'Giỏi'; } 
        else if (finalScore >= 8.5) { letterGrade = 'A'; score4 = 4.0; classification = 'Giỏi'; } 
        else if (finalScore >= 8.0) { letterGrade = 'A-'; score4 = 3.65; classification = 'Giỏi'; } 
        else if (finalScore >= 7.5) { letterGrade = 'B+'; score4 = 3.33; classification = 'Khá'; } 
        else if (finalScore >= 7.0) { letterGrade = 'B'; score4 = 3.0; classification = 'Khá'; } 
        else if (finalScore >= 6.5) { letterGrade = 'B-'; score4 = 2.65; classification = 'Khá'; } 
        else if (finalScore >= 6.0) { letterGrade = 'C+'; score4 = 2.33; classification = 'Trung bình'; } 
        else if (finalScore >= 5.5) { letterGrade = 'C'; score4 = 2.0; classification = 'Trung bình'; } 
        else if (finalScore >= 4.5) { letterGrade = 'C-'; score4 = 1.65; classification = 'Trung bình yếu'; } 
        else if (finalScore >= 4.0) { letterGrade = 'D'; score4 = 1.0; classification = 'Trung bình yếu'; } 
        else { letterGrade = 'F'; score4 = 0.0; classification = 'Kém'; }
        
        if (isFailed) {
            letterGrade = 'F';
            score4 = 0.0;
            classification = 'Kém';
            status = 'Nợ môn';
            statusClass = 'bg-red-100 text-red-700';
        } else {
            status = 'Qua môn';
            statusClass = 'bg-green-100 text-green-700';
        }

        document.getElementById('total-weight').textContent = `${totalWeight}%`;
        document.getElementById('final-score').textContent = finalScore.toFixed(2);
        document.getElementById('score-4').textContent = score4.toFixed(2);
        document.getElementById('letter-grade').textContent = letterGrade;
        document.getElementById('classification').textContent = classification;
        
        const statusEl = document.getElementById('status');
        statusEl.textContent = status;
        statusEl.className = `font-bold text-xl px-4 py-1.5 rounded-full ${statusClass}`;
        
        noteEl.innerHTML = note;

        // show centered modal overlay
        if (resultOverlay) {
            resultOverlay.classList.add('show');
            resultOverlay.setAttribute('aria-hidden', 'false');
        } else {
            resultDiv.classList.remove('hidden');
        }
    });

    // Close modal handlers
    if (closeResultBtn && resultOverlay) {
        closeResultBtn.addEventListener('click', function() {
            resultOverlay.classList.remove('show');
            resultOverlay.setAttribute('aria-hidden', 'true');
        });

        // close when clicking outside panel
        resultOverlay.addEventListener('click', function(e) {
            if (e.target === resultOverlay) {
                resultOverlay.classList.remove('show');
                resultOverlay.setAttribute('aria-hidden', 'true');
            }
        });
    }
});
// --- Sao chép công thức trong accordion ---
document.addEventListener('click', function (e) {
  const btn = e.target.closest('#copy-formula');
  if (!btn) return;
  e.preventDefault();
  const src = document.getElementById('formula-text');
  const text = src ? src.innerText.trim() : '';
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Đã sao chép!';
    setTimeout(() => (btn.textContent = 'Sao chép'), 1400);
  }).catch(() => {
    btn.textContent = 'Copy lỗi, thử lại';
    setTimeout(() => (btn.textContent = 'Sao chép'), 1400);
  });
});
