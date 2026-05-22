package vallegrande.edu.pe.losQueensAgro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vallegrande.edu.pe.losQueensAgro.model.Supplier;
import vallegrande.edu.pe.losQueensAgro.repository.SupplierRepository;
import vallegrande.edu.pe.losQueensAgro.service.SupplierService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository repository;

    @Override
    public List<Supplier> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Supplier> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    @Override
    public List<Supplier> findActive() {
        return repository.findAllNotDeleted();
    }

    @Override
    public Supplier findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Supplier create(Supplier supplier) {
        supplier.setStatus("A");
        supplier.setCreatedDate(LocalDateTime.now());
        return repository.save(supplier);
    }

    @Override
    public Supplier update(Integer id, Supplier supplier) {
        Supplier existing = findById(id);
        if (existing != null) {
            existing.setCommercialName(supplier.getCommercialName());
            existing.setPhone(supplier.getPhone());
            existing.setEmail(supplier.getEmail());
            existing.setUbigeoCode(supplier.getUbigeoCode());
            existing.setRuc(supplier.getRuc());
            existing.setAddress(supplier.getAddress());
            existing.setUpdateDate(LocalDateTime.now());
            return repository.save(existing);
        }
        return null;
    }

    @Override
    public Supplier delete(Integer id) {
        Supplier existing = findById(id);
        if (existing != null) {
            existing.setStatus("I");
            existing.setDeletedDate(LocalDateTime.now());
            return repository.save(existing);
        }
        return null;
    }

    @Override
    public Supplier restore(Integer id) {
        Supplier existing = findById(id);
        if (existing != null) {
            existing.setStatus("A");
            existing.setDeletedDate(null);
            existing.setRestoredDate(LocalDateTime.now());
            return repository.save(existing);
        }
        return null;
    }
}