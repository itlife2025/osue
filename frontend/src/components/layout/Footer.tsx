export default function Footer() {
    return (
        <>
            <footer className="app-footer">
                <div className="footer-contents">
                    <div className="footer-left">
                        <h1 className="app-title">
                            <span className="text-secondary text-2xl">OSUE</span>
                        </h1>
                    </div>
                    <div className="footer-right">
                        <ul role="list" className="footer-menu">
                            <li className="text-sm text-secondary"><a href="">OSUE 소개</a></li>
                            <li className="text-sm text-secondary"><a href="">APP 다운로드</a></li>
                            <li className="text-sm text-secondary"><a href="">1:1 문의</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}