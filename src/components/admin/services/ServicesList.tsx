import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, ArrowUpDown, CheckSquare } from 'lucide-react';
import ServiceForm from './ServiceForm';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastModifiedBy: string;
}

type SortField = 'name' | 'price' | 'duration' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'updatedAt',
    order: 'desc'
  });

  useEffect(() => {
    const storedServices = localStorage.getItem('adminServices');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSave = (service: Omit<Service, 'createdAt' | 'updatedAt' | 'lastModifiedBy'>) => {
    const timestamp = new Date().toISOString();
    const updatedService = {
      ...service,
      updatedAt: timestamp,
      lastModifiedBy: 'Admin', // In a real app, this would be the current user
      createdAt: service.id ? (
        services.find(s => s.id === service.id)?.createdAt || timestamp
      ) : timestamp
    };

    let updatedServices;
    if (service.id) {
      updatedServices = services.map(s => s.id === service.id ? updatedService : s);
    } else {
      updatedServices = [...services, { ...updatedService, id: Date.now().toString() }];
    }
    
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar ${selectedServices.length} servicios?`)) {
      const updatedServices = services.filter(service => !selectedServices.includes(service.id));
      setServices(updatedServices);
      localStorage.setItem('adminServices', JSON.stringify(updatedServices));
      setSelectedServices([]);
    }
  };

  const handleBulkToggleActive = (active: boolean) => {
    const updatedServices = services.map(service => 
      selectedServices.includes(service.id) ? { ...service, active } : service
    );
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    setSelectedServices([]);
  };

  const filteredAndSortedServices = services
    .filter(service => 
      (searchTerm === '' || 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterActive === null || service.active === filterActive)
    )
    .sort((a, b) => {
      const { field, order } = sortConfig;
      const modifier = order === 'asc' ? 1 : -1;
      
      if (field === 'updatedAt') {
        return (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) * modifier;
      }
      
      return (a[field] > b[field] ? 1 : -1) * modifier;
    });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-serif text-brand-brown">Servicios</h2>
          <div className="flex flex-wrap gap-2">
            {selectedServices.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkToggleActive(true)}
                  className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                >
                  Activar seleccionados
                </button>
                <button
                  onClick={() => handleBulkToggleActive(false)}
                  className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
                >
                  Desactivar seleccionados
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Eliminar seleccionados
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setEditingService(null);
                setIsFormOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Servicio
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterActive === null ? '' : filterActive.toString()}
              onChange={(e) => setFilterActive(e.target.value === '' ? null : e.target.value === 'true')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
        </div>

        {isFormOpen && (
          <ServiceForm
            service={editingService}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingService(null);
            }}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedServices.length === filteredAndSortedServices.length}
                    onChange={(e) => {
                      setSelectedServices(
                        e.target.checked ? filteredAndSortedServices.map(s => s.id) : []
                      );
                    }}
                    className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
                  />
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('duration')}
                >
                  <div className="flex items-center">
                    Duración
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Precio
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última modificación
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        setSelectedServices(prev => 
                          e.target.checked
                            ? [...prev, service.id]
                            : prev.filter(id => id !== service.id)
                        );
                      }}
                      className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {service.duration} min
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    ${service.price}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500">
                      {new Date(service.updatedAt).toLocaleDateString()}
                      <div className="text-xs">
                        por {service.lastModifiedBy}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setIsFormOpen(true);
                      }}
                      className="text-brand-brown hover:text-brand-dark mr-3"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
                          const updatedServices = services.filter(s => s.id !== service.id);
                          setServices(updatedServices);
                          localStorage.setItem('adminServices', JSON.stringify(updatedServices));
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedServices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron servicios
          </div>
        )}
      </div>
    </div>
  );
}