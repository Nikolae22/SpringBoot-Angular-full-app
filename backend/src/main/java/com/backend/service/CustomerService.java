package com.backend.service;

import com.backend.domain.Customer;
import com.backend.domain.Invoice;
import com.backend.domain.Stats;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface CustomerService {

    //customer functions
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Customer customer);
    Page<Customer> getCustomers(int page,int size);
    Iterable<Customer> getCustomers();
    Customer getCustomer(Long id);
    Page<Customer> searchCustomer(String name,int page,int size);

    //invoice functions
    Invoice createInvoice(Invoice invoice);
    Page<Invoice> getInvoices(int page,int size);
    void addInvoiceToCustomer(Long id,Invoice invoice);
    Invoice getInvoice(Long id);
    Stats getStats();
}
