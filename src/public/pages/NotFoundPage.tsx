import { Link } from 'react-router-dom';
import { SystemPage, Signal, RecordLines } from '@public/components/system/SystemExperience';
export default function NotFoundPage() {
 return <SystemPage quiet><section className="nv-container nx-lost"><div><p className="nx-label">NAVORA / PAGE NOT FOUND</p><h1>We cannot find<br /><em>that page.</em></h1><p>The page may have moved, or the address may be wrong. You can return home or get in touch.</p><div className="nx-lost-actions"><Link to="/" className="nx-button">Back to Home <span aria-hidden="true">→</span></Link><Link to="/contact" className="nx-button nx-secondary">Contact NAVORA <span aria-hidden="true">→</span></Link></div></div><div className="nx-route-object"><Signal>Page not found</Signal><div className="nx-route-code" aria-hidden="true">404</div><RecordLines lines={['Request received', 'Page not found', 'Try Home or Contact']} /></div></section></SystemPage>;
}


