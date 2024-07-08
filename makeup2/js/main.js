document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(feedbackForm);
            fetch('api/add_feedback.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert('Feedback submitted successfully');
                    feedbackForm.reset();
                }
            });
        });
    }

    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(customerForm);
            fetch('api/add_customer.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert('Customer added successfully');
                    customerForm.reset();
                    loadCustomers();
                }
            });
        });
    }

    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(productForm);
            fetch('api/add_product.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert('Product added successfully');
                    productForm.reset();
                    loadProducts();
                }
            });
        });
    }

    function loadCustomers() {
        fetch('api/customers.php')
            .then(response => response.json())
            .then(customers => {
                const customerList = document.getElementById('customerList');
                customerList.innerHTML = '';  // Clear existing content
                if (customers.error) {
                    customerList.innerHTML = `<p>Error: ${customers.error}</p>`;
                    return;
                }
                customers.forEach(customer => {
                    const customerDiv = document.createElement('div');
                    customerDiv.className = 'customer';
                    customerDiv.innerHTML = `<strong>${customer.name}</strong> (${customer.email})`;
                    customerList.appendChild(customerDiv);
                });
            })
            .catch(error => {
                document.getElementById('customerList').innerHTML = `<p>Error fetching customers: ${error.message}</p>`;
            });
    }

    function loadProducts() {
        fetch('api/products.php')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('productList');
                productList.innerHTML = '';  // Clear existing content
                if (products.error) {
                    productList.innerHTML = `<p>Error: ${products.error}</p>`;
                    return;
                }
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `<strong>${product.name}</strong><br>${product.description}<br>$${product.price}`;
                    productList.appendChild(productDiv);
                });
            })
            .catch(error => {
                document.getElementById('productList').innerHTML = `<p>Error fetching products: ${error.message}</p>`;
            });
    }

    if (document.getElementById('customerList')) {
        loadCustomers();
    }

    if (document.getElementById('productList')) {
        loadProducts();
    }

    if (document.getElementById('faqs')) {
        fetch('api/faqs.php')
            .then(response => response.json())
            .then(faqs => {
                const faqsContainer = document.getElementById('faqs');
                faqsContainer.innerHTML = '';  // Clear existing content
                if (faqs.error) {
                    faqsContainer.innerHTML = `<p>Error: ${faqs.error}</p>`;
                    return;
                }
                faqs.forEach(faq => {
                    const faqDiv = document.createElement('div');
                    faqDiv.className = 'faq';
                    const question = document.createElement('h3');
                    question.textContent = faq.question;
                    const answer = document.createElement('p');
                    answer.textContent = faq.answer;
                    faqDiv.appendChild(question);
                    faqDiv.appendChild(answer);
                    faqsContainer.appendChild(faqDiv);
                });
            })
            .catch(error => {
                document.getElementById('faqs').innerHTML = `<p>Error fetching FAQs: ${error.message}</p>`;
            });
    }
});
