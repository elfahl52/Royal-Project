document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.btn-gold-action');
    const btnText = submitBtn.querySelector('span') || submitBtn;

    // 1. إضافة تأثير الـ Focus على المدخلات
    const inputs = document.querySelectorAll('.royal-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-animated');
        });
        input.addEventListener('blur', () => {
            if (input.value === "") {
                input.parentElement.classList.remove('input-animated');
            }
        });
    });

    // 2. معالجة إرسال الفورم
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // تفعيل وضع التحميل (Loading)
        submitBtn.disabled = true;
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;

        // محاكاة إرسال البيانات (API Call Simulation)
        setTimeout(() => {
            // إعادة الزرار لحالته الأصلية
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;

            // إظهار رسالة النجاح
            showSuccessModal();
            
            // تفريغ الحقول
            contactForm.reset();
        }, 2000);
    });

    // 3. وظيفة إظهار رسالة النجاح (Custom Modal)
    function showSuccessModal() {
        const modalHtml = `
            <div id="successModal" class="custom-modal-overlay">
                <div class="custom-modal-content">
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h3>Great Job, Khaled!</h3>
                    <p>Your message has been sent to the Royal Team. We will contact you shortly.</p>
                    <button onclick="closeModal()" class="btn btn-gold-action px-5">Close</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
});

// وظيفة قفل المودال
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}