import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { FooterWidget } from '../landing/components/footerwidget';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, TopbarWidget, FooterWidget],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-0 dark:bg-surface-900">
        <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
        <div class="flex-1">
            <!-- Hero Services -->
            <section class="relative h-[400px] flex items-center justify-center overflow-hidden">
                <img src="/demo/images/galleria/landing4.jpg" alt="Servicios" class="absolute inset-0 w-full h-full object-cover brightness-50">
                <div class="relative z-10 text-center px-6">
                    <h1 class="text-6xl font-bold text-white mb-4">Soluciones Inmobiliarias Integrales</h1>
                    <p class="text-2xl text-gray-200 max-w-3xl mx-auto">Todo lo que necesitas para tu propiedad, en un solo lugar.</p>
                </div>
            </section>

            <!-- Services Grid -->
            <section class="py-20">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Compra -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-shopping-cart text-3xl text-blue-600 dark:text-blue-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Compra Directa</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Te acompañamos en todo el proceso de búsqueda, negociación y cierre para que consigas el mejor precio por tu nuevo hogar.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>

                        <!-- Venta -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-tag text-3xl text-purple-600 dark:text-purple-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Venta Premium</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Utilizamos inteligencia artificial y marketing digital de vanguardia para vender tu propiedad en tiempo récord.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>

                        <!-- Alquiler -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-key text-3xl text-green-600 dark:text-green-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Gestión de Alquiler</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Filtramos a los inquilinos y gestionamos los contratos para que tú solo te preocupes de recibir tu renta cada mes.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>

                        <!-- Valoración -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-chart-line text-3xl text-orange-600 dark:text-orange-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Tasación Gratuita</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Obten un informe detallado del valor de mercado de tu propiedad basado en datos reales y actualizados.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>

                        <!-- Asesoría Legal -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-briefcase text-3xl text-red-600 dark:text-red-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Asesoría Legal</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Expertos en derecho inmobiliario para resolver cualquier duda sobre contratos, herencias o trámites hipotecarios.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>

                        <!-- Inversión -->
                        <div class="group p-10 bg-white dark:bg-surface-800 rounded-3xl border border-gray-100 dark:border-surface-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div class="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <i class="pi pi-money-bill text-3xl text-teal-600 dark:text-teal-300"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Oportunidades de Inversión</h3>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Accede a propiedades exclusivas con alta rentabilidad antes de que salgan al mercado público.
                            </p>
                            <button class="text-primary-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Saber más <i class="pi pi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer-widget class="mt-auto" />
    </div>
  `
})
export class Servicios {}
